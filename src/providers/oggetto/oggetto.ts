import { Injectable } from '@angular/core';
import { Oggetto } from '../../models/oggetto';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the OggettoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OggettoProvider {
  oggetti: Oggetto[] = [];
  constructor() {
    console.log('Hello OggettoProvider Provider');
    this.oggetti = [
    {id: 1, nome: 'pentola', nomeUser: 'vittorio', data: new Date(), oggettoTornato: true, foto: 'fotoPentola'},
    {id: 2, nome: 'scopa', nomeUser: 'jonny', data: new Date(), oggettoTornato: false, foto: 'fotoScopa'}];
  }
  // aggiunge un nuovo oggetto alla lista
  addOggetto(oggetto: Oggetto): void {
    this.oggetti.push(oggetto);
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
