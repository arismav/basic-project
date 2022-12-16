import { AbstractControl } from '@angular/forms';

export function ValidateUrls(control: AbstractControl) {
   
    if ((/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(control.value)) {
        return null;
    }

    return { validUrl: true }


}