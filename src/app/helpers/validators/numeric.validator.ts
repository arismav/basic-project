import { AbstractControl } from '@angular/forms';

export function ValidateNumeric(control: AbstractControl) {
    if ((/[0-9]/).test(control.value)) {
        return null;
    }

    return { validNumeric: true }


}