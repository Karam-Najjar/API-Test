/**
 * Component for creating or updating posts.
 * Allows users to create new posts or update existing ones.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CustomValidators } from '../../../../../shared/validations/custom-validators';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../../user/services/users.service';
import { FullUser } from '../../../user/interfaces/full-user.interface';
import { ValidatorService } from '../../../../../shared/validations/validator.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  // Title for the form
  formTitle: string = 'Create new post';
  // Id of the post (if updating)
  postId!: any;
  // Form group for creating or updating post
  createForm!: FormGroup;
  // Flag to indicate whether the form is in read-only mode
  isReadOnly: boolean = false;
  // Custom validator reference
  customValidator = CustomValidators;
  // List of owners (users)
  owners!: FullUser[];
  // List of tags for the post
  tags: string[] = [];
  // Subscription for fetching data
  subscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit() {
    // Fetch post id from route parameters
    this.postId = this.route.snapshot.params['id'];

    // Fetch owners for the post
    this.getOwners();

    // If updating an existing post, fetch post data and populate form
    if (this.postId) {
      this.isReadOnly = true;
      this.formTitle = 'Update post';
      this.subscription = this.postService
        .getPostById(this.postId)
        .subscribe((postData: any) => {
          this.tags = postData.tags;
          postData.owner = postData.owner.id;
          this.createForm.patchValue(postData);
        });
    }

    // Initialize form with form controls
    this.createForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]], // Post text field
      likes: [7], // Default value for likes
      image: ['', Validators.required], // Image field
      owner: [{ value: null, disabled: this.isReadOnly }, Validators.required], // Owner field
    });
  }

  /**
   * Function to handle form submission.
   * Updates existing post if postId exists, otherwise creates a new post.
   */
  onSubmit() {
    const formData = this.createForm.value;
    formData.tags = this.tags;

    // Update mode
    if (this.postId) {
      this.subscription = this.postService
        .updatePost(this.postId, formData)
        .subscribe((data) => {
          this.router.navigate(['/posts']);
        });
    } else {
      // Create mode
      this.subscription = this.postService
        .createPost(formData)
        .subscribe((data) => {
          this.router.navigate(['/posts']);
        });
    }
  }

  /**
   * Function to navigate back to posts page when cancel button is clicked.
   */
  onCancel() {
    this.router.navigate(['/posts']);
  }

  /**
   * Function to get validation error message for a given form control.
   * @param controlName Name of the form control
   * @returns Validation error message
   */
  getValidationErrorMessage(controlName: string): string {
    const control = this.createForm.get(controlName);
    return control
      ? this.validatorService.getValidationErrorMessage(control)
      : '';
  }

  /**
   * Function to fetch owners (users) for the post.
   */
  getOwners() {
    return this.usersService.getUsers('user').subscribe((data: any) => {
      this.owners = data.data;
    });
  }

  /**
   * Function to add a tag to the list of tags for the post.
   * @param tag Tag to be added
   */
  addTag(tag: string) {
    if (tag.trim() !== '') {
      this.tags.push(tag.trim());
    }
  }

  /**
   * Function to remove a tag from the list of tags for the post.
   * @param index Index of the tag to be removed
   */
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Unsubscribes from any subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
