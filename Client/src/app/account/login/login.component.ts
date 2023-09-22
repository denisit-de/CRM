import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { User } from 'src/app/models/account/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    ) {
    this.form = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.accountService.login(this.form.value).subscribe({
      next: data => this.onLogin(data),
      error: err => this.onError(err)
    });
  }

  private onLogin(data: User): void {
    this.errorMessages = [];
    console.log(data);
  }

  private onError(err: any): void {
    if(err.errors) {
      this.errorMessages = err.errors;
    } else {
      this.errorMessages = [];
      this.errorMessages.push(err.error);
    }
  }

}
