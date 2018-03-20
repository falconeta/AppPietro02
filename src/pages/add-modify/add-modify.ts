import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Oggetto } from '../../models/oggetto';
import { HomePage } from '../home/home';
import { OggettoProvider } from '../../providers/oggetto/oggetto';

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
oggetto: Oggetto;
  constructor(private oggettoProvider: OggettoProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.selector = this.navParams.get('selector');
    this.selector === 'modifica' ? this.modifyPage() : this.createPage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddModifyPage');
  }

  modifyPage(){
    this.oggetto = this.navParams.get('oggetto'); 
  }

  createPage(){
    this.oggetto = new Oggetto; 
    this.oggetto.data = new Date().toISOString();
  }

  saveModify(){
    alert('sono in modifica');
    this.navCtrl.push(HomePage);
  }
  saveAdd(){
    alert('sono in Add');
    this.oggettoProvider.addOggetto(this.oggetto);
    this.navCtrl.push(HomePage);
  }

}
