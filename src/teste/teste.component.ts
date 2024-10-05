import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToFormType } from '../utils/form-types';
import { Usuario } from '../models/Usuario';
import { criarFormulario } from '../utils/form-utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent {

  testeForm: ToFormType<Usuario>;

  constructor() {
    this.testeForm = criarFormulario(Usuario);
    console.log(this.testeForm);
  }

  get controls() {
    return Object.keys(this.testeForm.controls);
  }

  getControlType(controlName: string): string {
    const usuario: Usuario = new Usuario();
    const fieldTypes = (usuario.constructor as any).fieldTypes;
    return fieldTypes[controlName] || 'text';
  }

  getErrorMessage(controlName: string): string {
    const control = this.testeForm.get(controlName);
    if (control && control.invalid) {
      const errors = control.errors;
      if (errors) {
        return 'Não atende todos validators.';
      }
    }
    return '';
  }

}
