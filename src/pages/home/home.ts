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
    this.plt.ready().then((readySource) => {
      this.nativeStorage.getItem('items').then(oggetti => {
        this.oggetti = oggetti;
       // alert('si');
        this.oggettoProvider.setOggetti(this.oggetti);
        }).catch((error) => {
          console.log(error);
          let modal = this.modalCtrl.create(WelcomePage);
          modal.present();
          // alert('no');
          this.oggettoProvider.setOggetti(this.oggetti);
        });
    });
  }
  addItem(){
    let modal = this.modalCtrl.create(AddModifyPage, {selector: 'Aggiungi'});
    modal.present();
    
  }
  rimuoviOggetto(oggetto: Oggetto){
    this.oggettoProvider.removeOggetto(oggetto);
  }
  modificaOggetto(oggetto: Oggetto) {
    let modal = this.modalCtrl.create(AddModifyPage, {selector: 'modifica', oggetto: oggetto});
    modal.present();
  }
  toogleOggettoTornato(oggetto: Oggetto){
    oggetto.oggettoTornato ? oggetto.oggettoTornato = false : oggetto.oggettoTornato = true;
    this.oggettoProvider.modifyOggetto(); 
  }

}
