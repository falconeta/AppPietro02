import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddModifyPage } from '../add-modify/add-modify';
import { Oggetto } from '../../models/oggetto';
import { OggettoProvider } from '../../providers/oggetto/oggetto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: Oggetto[] = [];
  constructor(private oggettoProvider: OggettoProvider, public navCtrl: NavController) {
    this.oggettoProvider.getOggetti().subscribe(oggetti => this.oggetti = oggetti);
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
