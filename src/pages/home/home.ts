import { Oggetto } from './../../models/oggetto';
import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { AddModifyPage } from '../add-modify/add-modify';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { NativeStorage } from '@ionic-native/native-storage';
import { WelcomePage } from '../welcome/welcome';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: Oggetto[] = [];
  constructor(private modalCtrl: ModalController, public plt: Platform, private nativeStorage: NativeStorage, private oggettoProvider: OggettoProvider, public navCtrl: NavController) {
    // al caricamento dei plugin cordova esegui il codice
    this.plt.ready().then((readySource) => {
      this.nativeStorage.getItem('items').then(oggetti => {
        this.oggetti = oggetti;
        this.oggettoProvider.setOggetti(this.oggetti);
        }).catch((error) => {
          console.log(error);
          let modal = this.modalCtrl.create(WelcomePage);
          modal.present(); // se non esiste l'item nel native storage apri la modale welcome
          this.oggettoProvider.setOggetti(this.oggetti);
        });
    });
  }
  // avvia modale in modalità aggiungi
  addItem(){
    let modal = this.modalCtrl.create(AddModifyPage, {selector: 'Aggiungi'});
    modal.present();
  }
  // rimuove oggetto dall'array oggetti e salva nel native storage
  rimuoviOggetto(oggetto: Oggetto){
    this.oggettoProvider.removeOggetto(oggetto);
  }
  // avvia modale in modalità modifica
  modificaOggetto(oggetto: Oggetto) {
    let modal = this.modalCtrl.create(AddModifyPage, {selector: 'modifica', oggetto: oggetto});
    modal.present();
  }
  // imposta la propietà booleana(toogle) dell'oogetto oggetto
  toogleOggettoTornato(oggetto: Oggetto){
    oggetto.oggettoTornato ? oggetto.oggettoTornato = false : oggetto.oggettoTornato = true;
    this.oggettoProvider.modifyOggetto(); // salva native storage
  }

}
