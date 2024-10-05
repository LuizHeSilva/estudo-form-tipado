import { FieldType } from "../utils/field-type";
import { Endereco } from "./Endereco";
import { Validators } from '@angular/forms';
import { Validate } from '../utils/form-utils';

export class Usuario {

  @FieldType('text')
  @Validate([Validators.required, Validators.minLength(5)])
  nome: string = '';

  @FieldType('number')
  idade: number = 0;

  @FieldType('date')
  dataNascimento: Date = new Date();

  endereco: Endereco = new Endereco();
  lista: string[] = []
}
