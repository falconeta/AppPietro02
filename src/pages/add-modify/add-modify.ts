import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Oggetto } from '../../models/oggetto';
import { HomePage } from '../home/home';
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
              private device: Device, public viewCtrl: ViewController) {
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
    this.oggettoProvider.modifyOggetto();
    this.viewCtrl.dismiss();
  }
  saveAdd(){
    alert('sono in Add');
    this.oggettoProvider.addOggetto(this.oggetto);
    this.viewCtrl.dismiss();
  }
  getFoto(){
    let type: number;
    this.device.platform === 'iOS' ? type = 0 : type = 1; 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type 
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.oggetto.foto = base64Image;
      // alert(base64Image);
     }, (err) => {
      // Handle error
     });
  }

}
