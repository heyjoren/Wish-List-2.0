export class user {
  id?: string;
  voornaam: string;
  achternaam: string;
  aanspreking: string;
  email: string;
  passwd: string;
  role?: string;

  constructor() {
    this.id = '';
    this.voornaam = '';
    this.achternaam = '';
    this.aanspreking = '';
    this.email = '';
    this.passwd = '';
    this.role = '';
  }
}