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

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.accountService.login(this.form.value).subscribe({
      next: data => this.onLogin(data),
      error: err => console.log(err)
    });
  }

  private onLogin(data: User): void {
    console.log(data);
  }

}
