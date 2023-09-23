import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { User } from 'src/app/models/account/User';
import { take } from 'rxjs';
import { Session } from 'src/app/models/account/Session';
import { Router } from '@angular/router';

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
      error: err => this.onError(err)
    });
  }

  private onRegister(data: User) {
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
