import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddModifyPage } from '../add-modify/add-modify';
import { Oggetto } from '../../models/oggetto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: Oggetto[] = [];
  constructor(public navCtrl: NavController) {

  }
  addItem(){
    this.navCtrl.push(AddModifyPage, {add: 'Aggiungi'});
  }
}
