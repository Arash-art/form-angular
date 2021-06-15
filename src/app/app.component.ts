import { UtenteService } from './utente.service';
import { Component, OnInit } from '@angular/core';
import { Utenti } from './../../Utenti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  UtentiList: Utenti[] = [];

  constructor(private UtenteService: UtenteService) {}
  ngOnInit() {
    this.UtentiList = this.UtenteService.listaUtenti;
  }
  isUndefined(value) {
    return typeof value === 'undefined';
  }
}
