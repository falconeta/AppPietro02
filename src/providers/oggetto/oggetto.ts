import { Injectable } from '@angular/core';
import { Oggetto } from '../../models/oggetto';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NativeStorage } from '@ionic-native/native-storage';
/*
  Generated class for the OggettoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OggettoProvider {
  oggetti: Oggetto[] = [];
  boolPromise = false;
  date: string = new Date().toISOString();
  constructor(private nativeStorage: NativeStorage) {
  }
  setOggetti(oggetti: Oggetto[]){
    this.oggetti = oggetti;
  }
  // aggiunge un nuovo oggetto alla lista
  addOggetto(oggetto: Oggetto): void {
    oggetto.id = this.oggetti.length;
    this.oggetti.push(oggetto);
    this.nativeStorage.setItem('items', this.oggetti).then(() => alert('storage '+ this.oggetti.length));
  }
  // restituisce l'array di oggetti
  getOggetti(): Observable<Oggetto[]> {
        return of(this.oggetti);
  }
  // restituisce oggetto con avente l'id corrispondente
  getOggetto(id: number): Observable<Oggetto> { 
    return of(this.oggetti.find(oggetto => oggetto.id === id));
  }
  // rimuove l'oggetto dall'array
  removeOggetto(oggetto: Oggetto): void{
    this.oggetti.forEach((item, index) => {
      if(item.id === oggetto.id) this.oggetti.splice(index,1);
    });
    this.oggetti.forEach((item, index) => {
      this.oggetti[index].id = index;
    });
    this.nativeStorage.setItem('items', this.oggetti).then(() => alert('storage '+ this.oggetti.length));
    alert('rimosso');
  }
  modifyOggetto(){
    this.nativeStorage.setItem('items', this.oggetti).then(() => alert('storage '+ this.oggetti.length));
  }
}
