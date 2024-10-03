import { FormGroup, FormControl, FormArray } from '@angular/forms';

export type ToFormType<T> = FormGroup<{
  [K in keyof T]: T[K] extends object
    ? T[K] extends Date
      ? FormControl<T[K] | null>
      : T[K] extends unknown[]
        ? FormArray<ToFormType<T[K] extends (infer V)[] ? V : T[K]>>
        : ToFormType<T[K]>
    : FormControl<T[K] | null>;
}>;