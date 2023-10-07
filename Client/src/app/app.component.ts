import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { Session } from './models/account/Session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'CRM App';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  private getLoggedInUser() {
    this.accountService.getLoggedinUser()
  }

}
