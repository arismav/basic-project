import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    langs: any = { 'el': 'Greek', 'en': 'English' };
    currentLanguage: string | null = null;

    constructor(
        private _translateService: TranslateService
    ) { }

    changeLanguage = (lang: string) => {
        this.currentLanguage = lang;
        this._translateService.use(lang);
    }

    getCurrentLanguage = () => {
        return this.currentLanguage;
    }


}