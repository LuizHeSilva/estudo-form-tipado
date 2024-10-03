import { FieldType } from "../utils/field-type";
import { Endereco } from "./Endereco";

export class Usuario {
    @FieldType('text')
    nome: string = '';
    @FieldType('number')
    idade: number = 0;
    @FieldType('date')
    dataNascimento: Date = new Date();
    endereco: Endereco = new Endereco();
    lista: string[] = []
}
