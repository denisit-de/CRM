import { Register } from './../../models/account/Register';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { User } from 'src/app/models/account/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    ) {
    this.form = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  onSubmit(): void {
    this.accountService.register(this.form.value).subscribe({
      next: data => this.onRegister(data),
      error: err => console.log(err)
    });
  }

  private onRegister(data: User) {
    console.log(data);
  }

}
