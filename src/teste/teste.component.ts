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

  createFormControls(instance: any): { [key: string]: FormControl } {
    const controls: { [key: string]: FormControl } = {};
    const fieldTypes = (instance.constructor as any).fieldTypes;

    for (const key in fieldTypes) {
      controls[key] = new FormControl(instance[key]);
    }

    return controls;
  }

  getControlType(controlName: string): string {
    const usuario: Usuario = new Usuario();
    const fieldTypes = (usuario.constructor as any).fieldTypes;
    return fieldTypes[controlName] || 'text';
  }

}