import {AbstractControl, ValidationErrors} from "@angular/forms";

export function startsWithA(control: AbstractControl): ValidationErrors | null {

  return control.value && control.value.startsWith('A') ?
    null : {'startsWithA': "must have A at the begining"};
}

export function mustBeLongerThan2(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.length > 2 ?
    null : {'mustBeBiggerThan2': {currentLength: control.value.length}};
}
