export class item {
    id?: string;
    naam: string;
    prijs: number;
    beschrijving: string;
    img?: string;
    fabrikant: string;
    uid?: string;
    toegevoegOp: Date;
  
    constructor() {
      this.id = '';
      this.naam = '';
      this.prijs = 0;
      this.beschrijving = '';
      this.img = '';
      this.fabrikant = '';
      this.uid = '';
      this.toegevoegOp = new Date();
    }
  }