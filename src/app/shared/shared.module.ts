import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsComponent } from './components/actions/actions.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActionsComponent, SpinnerComponent, AlertComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ActionsComponent,
    SpinnerComponent,
    CommonModule,
    AlertComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
