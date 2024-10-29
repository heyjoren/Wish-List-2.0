export class bedrag {
    id?: string;
    // bedrag: string;
    bedrag: number;
    teken: string;
    datum: Date;
    // datum: string;
    uid?: string;
  
    constructor() {
      this.id = '';
      this.bedrag = 0;
      this.teken = '';
      this.datum = new Date();
      this.uid = '';
    }
  }