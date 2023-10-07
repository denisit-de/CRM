import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    ValidationMessagesComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationMessagesComponent
  ]
})
export class ErrorsModule { }
