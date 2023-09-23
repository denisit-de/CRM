import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Session } from 'src/app/models/account/Session';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    private router: Router
    ) {

      this.accountService.loggedInUser$
          .pipe(take(1))
          .subscribe({
            next: (user: Session | null) => {
              if(user) router.navigate(['/']);
            }
          });

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

  private onLogin(data: Session): void {
    this.errorMessages = [];
    this.router.navigate(['/']);
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
