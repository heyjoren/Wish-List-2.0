import { Injectable } from '@angular/core';
import { Observable, map, tap, Subject, from   } from 'rxjs';
import { bedrag } from './bedrag.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, DocumentReference, Firestore, setDoc, where, query, Timestamp } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { SortBedragenByDatePipePipe } from '../sort-bedragen-by-date-pipe.pipe';


@Injectable({
  providedIn: 'root'
})
export class BedragService {
  bedragen: bedrag[] = [];
  bedragenUpdated = new Subject<bedrag[]>();
  selectedItemId: string | null = null;

  constructor(private db: Firestore, private auth: AuthService, private sortBedragenByDatePipe: SortBedragenByDatePipePipe ) { }

  getBedragen(): Observable<bedrag[]> {
    return collectionData<bedrag>(
      query(
        collection(this.db, 'bedrag') as CollectionReference<bedrag>,
        where("uid", "==", this.auth.getUid())
      ),
      { idField: 'id' }
    );
  }

  getBedragenPut(): void {
    this.getBedragen().pipe(
      map(bedragen => 
        bedragen.map(bedrag => {
          bedrag.datum = this.getDate(bedrag.datum);
          return bedrag;
        })
      ),
      map(bedragen => this.sortBedragenByDatePipe.transform(bedragen))
    ).subscribe({  
      next: (response: bedrag[]) => {
          this.bedragen = response;
          this.bedragenUpdated.next(this.bedragen);
      },
    error: (error) => console.log('error: ', error)
    });
  }

  getLastBedragen(): Observable<bedrag[]> {
    return this.getBedragen().pipe(
      map(bedragen => bedragen.slice(-5))
    );
  }


  addBedrag(bedrag: bedrag) {
    const newID = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'bedrag/' + newID);
    return from (setDoc(ref, bedrag));
  }

  deleteBedrag(id: string) {
    const bedragRef = doc(this.db, 'bedrag/' + id) as DocumentReference<bedrag>;
    return from(deleteDoc(bedragRef));
  }

  private getDate(dateField: any): Date {
    if (dateField && dateField.toDate) {
      return dateField.toDate();
    }
    return new Date(dateField);
  }

}