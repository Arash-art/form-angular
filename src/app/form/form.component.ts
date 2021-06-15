import { element } from 'protractor';
import { UtenteService } from './../utente.service';
import { Utenti } from './../../../Utenti';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  Utenti: Utenti = new Utenti();
  myForm: FormGroup;

  submitted = false;

  constructor(
    private UtenteService: UtenteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            this.validateEmail,
          ],
        ],
        date: ['', [Validators.required, this.validateDate]],
      },
      { updateOn: 'submit' }
    );
  }

  validateDate(control: AbstractControl): ValidationErrors | null {
    let forbidden = false;
    const eightYearsAgo = moment().subtract(18, 'years');
    const birthday = moment(control.value);
    if (!eightYearsAgo.isAfter(birthday)) {
      forbidden = true;
    }
    console.log(forbidden, forbidden ? { maggiorenne: true } : null);
    return forbidden ? { maggiorenne: true } : null;
  }

  validateEmail = (control: AbstractControl): ValidationErrors | null => {
    if (typeof this !== 'undefined') {
      const isDuplicateEmail = this.UtenteService.listaUtenti.some(
        (element) => element.email === control.value
      );
      return isDuplicateEmail ? { duplicateEmail: true } : null;
    }
  };

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.UtenteService.listaUtenti.push(this.myForm.value);
    this.myForm.reset();
  }
}
