export class User {
    constructor(
      public email: string | null | undefined,
      public id: string | null | undefined,
      public token: string | null | undefined,
      //private _tokenExpirationDate: Date
    ) {}
  
    // get token() {
    // //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    // //     return null;
    // //   }
    //   return this._token;
    // }
  }
  
  export interface IDummyUser {
    name: string,
    surname: string
  }

  export class DummyUser implements IDummyUser{
    name: string;
    surname: string;

    constructor(name: string, surname: string) {
      this.name = name;
      this.surname = surname;
    }
  }