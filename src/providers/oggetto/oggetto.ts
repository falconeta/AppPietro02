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
  date: string = new Date().toISOString();
  constructor(private nativeStorage: NativeStorage) {
    nativeStorage.getItem('oggetti').then(data => this.oggetti = data);
  }
  // aggiunge un nuovo oggetto alla lista
  addOggetto(oggetto: Oggetto): void {
    this.oggetti.push(oggetto);
    this.nativeStorage.setItem('oggetti', this.oggetti).then(() => alert('storage'));
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
  removeOggetto(id: number): void{
    this.oggetti.forEach((item, index) => {
      if(item.id === id) this.oggetti.splice(index,1);
    });
    alert('rimosso');
  }
}
