import { Injectable } from '@angular/core';
import { Observable, map, tap, Subject, from   } from 'rxjs';
import { bedrag } from './bedrag.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, DocumentReference, Firestore, setDoc, where, query } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BedragService {
  // alleBedragen: bedrag[] = [];
  bedragen: bedrag[] = [];
  bedragenUpdated = new Subject<bedrag[]>();
  selectedItemId: string | null = null;
  // uid: string | null = "";

  constructor(private db: Firestore, private auth: AuthService ) { }

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