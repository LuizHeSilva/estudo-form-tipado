import { FormGroup, FormControl, FormArray } from '@angular/forms';

function getInitialValue(value: any): any {
    if (typeof value === 'string') return '';
    if (typeof value === 'number') return 0;
    if (typeof value === 'boolean') return false;
    if (value instanceof Date) return new Date();
    if (Array.isArray(value)) return [];
    if (typeof value === 'object' && value !== null) return {};
    return null;
  }
export function criarFormulario<T>(modelo: new () => T): FormGroup {
  const instancia = new modelo();
  const grupo: any = {};

  for (const key in instancia) {
    if (instancia[key] instanceof Date) {
      grupo[key] = new FormControl(null);
    } else if (Array.isArray(instancia[key])) {
      grupo[key] = new FormArray(
        (instancia[key] as any[]).map(() => new FormControl(getInitialValue(key)))
      );
    } else if (typeof instancia[key] === 'object' && instancia[key] !== null) {
      const modeloAninhado = instancia[key].constructor as new () => T;
      grupo[key] = criarFormulario(modeloAninhado);
    } else {
      grupo[key] = new FormControl(getInitialValue(key));
    }
  }

  return new FormGroup(grupo);
}
