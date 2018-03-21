import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Oggetto } from '../../models/oggetto';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

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
  constructor(private oggettoProvider: OggettoProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera,
              private device: Device, 
              public viewCtrl: ViewController) 
  {// trasforma la pagina in modalità aggiungi o modifica
    this.selector = this.navParams.get('selector');
    this.selector === 'modifica' ? this.oggetto = this.navParams.get('oggetto') : this.createPage();
  }

  ionViewDidLoad() {
   
  }

  createPage(){
    this.oggetto = new Oggetto; 
    this.oggetto.data = new Date().toISOString();
  }

  saveModify(){//metodo chiamato dal bottone slva in modalità modifica
    this.oggettoProvider.modifyOggetto();
    this.viewCtrl.dismiss();
  }
  saveAdd(){//metodo chiamato dal bottone slva in modalità aggiungi
    this.oggettoProvider.addOggetto(this.oggetto);
    this.viewCtrl.dismiss();
  }
  getFoto(){ // al click del div esegue questo metodo
    let type: number;
    this.device.platform === 'iOS' ? type = 0 : type = 1; 
    const options: CameraOptions = {
      quality: 20,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    }
    this.camera.getPicture(options).then((imageData) => {// cattura l'immagine 
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.oggetto.foto = base64Image;
     }, (err) => {
     });
  }
  close(){
    this.viewCtrl.dismiss();
  }
}