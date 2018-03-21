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
  private oggetti: Oggetto[] = [];
  constructor(private nativeStorage: NativeStorage) {}
  // setta la proprietà oggetti di questo servizio
  setOggetti(oggetti: Oggetto[]): void {
    this.oggetti = oggetti;
  }
  // aggiunge un nuovo oggetto alla lista
  addOggetto(oggetto: Oggetto): void {
    oggetto.id = this.oggetti.length;
    this.oggetti.push(oggetto);
    this.nativeStorage.setItem('items', this.oggetti).then();
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
    this.oggetti.forEach((item, index) => this.oggetti[index].id = index);
    this.nativeStorage.setItem('items', this.oggetti).then();
    alert('rimosso');
  }
  // aggiunge la modifica al native storage
  modifyOggetto(){
    this.nativeStorage.setItem('items', this.oggetti).then();
  }
}
