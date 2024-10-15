import { Injectable } from '@angular/core';
import { Observable, map, tap, Subject, from   } from 'rxjs';
import { bedrag } from './bedrag.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { formatCurrency } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class BedragService {
  bedragen: bedrag[] = [];
  bedragenUpdated = new Subject<bedrag[]>();
  selectedItemId: string | null = null;

  constructor(private db: Firestore) { }

  getBedragen(): Observable<bedrag[]> {
    return collectionData<bedrag>(
      collection(this.db, 'bedrag') as CollectionReference<bedrag>,
      { idField: 'id' }
    )
  }

  getBedragenPut(): void {
    this.getBedragen().subscribe({
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

}
