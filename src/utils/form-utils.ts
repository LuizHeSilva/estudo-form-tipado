import { FormGroup, FormControl, FormArray, ValidatorFn } from '@angular/forms';

function getInitialValue(value: any): any {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  if (value instanceof Date) return new Date();
  if (Array.isArray(value)) return [];
  if (typeof value === 'object' && value !== null) return {};
  return null;
}

export function Validate(validators: ValidatorFn[]) {
  return function (target: any, propertyKey: string) {
    let validatorsMetadata = target.constructor.validatorsMetadata;
    if (!validatorsMetadata) {
      validatorsMetadata = {};
      target.constructor.validatorsMetadata = validatorsMetadata;
    }
    validatorsMetadata[propertyKey] = validators;
  };
}

export function criarFormulario<T>(modelo: new () => T): FormGroup {
  const instancia = new modelo();
  const grupo: any = {};

  const validatorsMetadata = (modelo as { validatorsMetadata?: Record<string, ValidatorFn[]> }).validatorsMetadata || {};

  for (const key in instancia) {
    const validators = validatorsMetadata[key];

    if (instancia[key] instanceof Date) {
      grupo[key] = new FormControl(null, validators ? validators : undefined);
    } else if (Array.isArray(instancia[key])) {
      grupo[key] = new FormArray(
        (instancia[key] as any[]).map(() => new FormControl(getInitialValue(key), validators ? validators : undefined))
      );
    } else if (typeof instancia[key] === 'object' && instancia[key] !== null) {
      const modeloAninhado = instancia[key].constructor as new () => T;
      grupo[key] = criarFormulario(modeloAninhado);
    } else {
      grupo[key] = new FormControl(getInitialValue(key), validators ? validators : undefined);
    }
  }

  return new FormGroup(grupo);
}
