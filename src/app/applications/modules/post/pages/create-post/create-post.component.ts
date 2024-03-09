import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CustomValidators } from '../../../../../shared/validations/custom-validators';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../../user/services/users.service';
import { Post } from '../../interfaces/post.interface';
import { FullUser } from '../../../user/interfaces/full-user.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  formTitle: string = 'Create new post';
  postId!: any;
  createForm!: FormGroup;
  post!: Post;
  isReadOnly: boolean = false;
  customValidator = CustomValidators;
  owners!: FullUser[];
  tags: string[] = [];

  subscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.post = this.route.snapshot.data['post'];

    this.getOwners();

    if (this.postId) {
      this.isReadOnly = true;
      this.formTitle = 'Update post';
      this.subscription = this.postService
        .getPostById(this.postId)
        .subscribe((postData: any) => {
          this.post = postData;
          this.tags = postData.tags;
          postData.owner = postData.owner.id;
          this.createForm.patchValue(postData);
        });
    }
    this.createForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]],
      likes: [7],
      image: ['', Validators.required],
      owner: [{ value: null, disabled: this.isReadOnly }, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.createForm.value;
    formData.tags = this.tags;

    // Update mode
    if (this.postId) {
      this.postService.updatePost(this.postId, formData).subscribe((data) => {
        this.router.navigate(['/posts']);
      });
    } else {
      this.postService.createPost(formData).subscribe((data) => {
        this.router.navigate(['/posts']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/posts']);
  }

  getValidationErrorMessage(controlName: string): string {
    const control = this.createForm.get(controlName);

    if (control?.hasError('required')) {
      return this.customValidator.required;
    }

    if (control?.hasError('minlength')) {
      return this.customValidator.minLength;
    }

    if (control?.hasError('maxlength')) {
      return this.customValidator.maxLength;
    }
    if (control?.hasError('email')) {
      return this.customValidator.email;
    }

    return '';
  }

  getOwners() {
    return this.usersService.getUsers('user').subscribe((data: any) => {
      this.owners = data.data;
    });
  }

  addTag(tag: string) {
    if (tag.trim() !== '') {
      this.tags.push(tag.trim());
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
