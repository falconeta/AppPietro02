import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddModifyPage } from '../add-modify/add-modify';
import { Oggetto } from '../../models/oggetto';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: Oggetto[] = [];
  constructor(private nativeStorage: NativeStorage, private oggettoProvider: OggettoProvider, public navCtrl: NavController) {
    nativeStorage.getItem('oggetti').then().catch();
    // this.oggettoProvider.getOggetti().subscribe(oggetti => this.oggetti = oggetti);
  }
  addItem(){
    this.navCtrl.push(AddModifyPage, {selector: 'Aggiungi'});
  }
  rimuoviOggetto(oggetto: Oggetto){
    this.oggettoProvider.removeOggetto(oggetto.id);
  }
  modificaOggetto(oggetto: Oggetto) {
    this.navCtrl.push(AddModifyPage, {selector: 'modifica', oggetto: oggetto} );
  }
}
