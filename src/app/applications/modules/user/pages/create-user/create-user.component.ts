import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from '../../../../../shared/validations/custom-validators';
import { UsersService } from '../../services/users.service';
import { FullUser } from '../../interfaces/full-user.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit, OnDestroy {
  formTitle: string = 'Create new user';
  userId!: any;
  isLoading: boolean = false;
  createForm!: FormGroup;
  user: FullUser = {};
  isReadOnly: boolean = false;
  customValidator = CustomValidators;
  subscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.user = this.route.snapshot.data['user'];

    this.createForm = this.fb.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      title: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      picture: new FormControl(null),
    });

    if (this.userId) {
      this.isReadOnly = true;
      this.formTitle = 'Update user';
      this.createForm.patchValue(this.user);
    }
  }

  onSubmit() {
    const formData = this.createForm.value;

    if (this.userId) {
      this.subscription = this.usersService
        .updateUser(this.userId, formData)
        .subscribe((data) => {
          this.router.navigate(['/users']);
        });
    } else {
      this.subscription = this.usersService
        .createUser(formData)
        .subscribe((data) => {
          this.router.navigate(['/users']);
        });
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
