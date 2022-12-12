import { AbstractControl } from '@angular/forms';

export function ValidateLowercase(control: AbstractControl) {
   
    if ((/[a-z]/).test(control.value)) {
        return null;
    }

    return { validLowercase: true }


}