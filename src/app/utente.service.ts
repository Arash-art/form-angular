import { Utenti } from './../../Utenti';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor() {}
  listaUtenti: Utenti[] = [];
}
