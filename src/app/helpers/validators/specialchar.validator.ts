import { AbstractControl } from '@angular/forms';

export function ValidateSpecialchar(control: AbstractControl) {
    //console.log((/!@#$%^&*_=+-/).test(control.value))
    if ((/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(control.value)) {
        return null;
    }

    return { validSpecialchar: true }


}