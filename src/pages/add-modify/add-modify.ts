import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-modify',
  templateUrl: 'add-modify.html',
})
export class AddModifyPage {
selector: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selector = this.navParams.get('selector');
    this.selector === 'modifica' ? this.modifyPage() : this.createPage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddModifyPage');
  }

  modifyPage(){
    
  }

  createPage(){

  }
}
