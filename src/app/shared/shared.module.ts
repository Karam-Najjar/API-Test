import { NgModule } from '@angular/core';

import { ActionsComponent } from './components/actions/actions.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ActionsComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [ActionsComponent, SpinnerComponent, CommonModule],
})
export class SharedModule {}
