import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddModifyPage } from './add-modify';

@NgModule({
  declarations: [
    AddModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddModifyPage),
  ],
})
export class AddModifyPageModule {}
