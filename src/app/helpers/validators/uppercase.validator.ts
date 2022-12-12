import { AbstractControl } from '@angular/forms';

export function ValidateUppercase(control: AbstractControl) {
    if ((/[A-Z]/).test(control.value)) {
        return null;
    }

    return { validUppercase: true }


}