import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, from, map, tap } from 'rxjs';
import { item } from './item.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: item[] = [];
  ItemsUpdated = new Subject<item[]>();



  constructor(private db: Firestore) { }

  getItems(): Observable<item[]> {
    return collectionData<item>(
      collection(this.db, 'item') as CollectionReference<item>,
      { idField: 'id'}
    )
  }

  getItemsnPut(): void {
    this.getItems().subscribe({
      next: (respons: item[]) => {
        this.items = respons;
        this.ItemsUpdated.next(this.items);
      },
      error: (error) => console.log('error: ', error)
    });
  }

  getLastItems(): Observable<item[]> {
    return this.getItems().pipe(
      map(items => items.slice(-5))
    );
  }

  getItem(id: string): Observable<item | undefined>{
    // const itemRef = doc(this.db, 'item', id);
    // return collectionData<item>(collection(this.db, 'item') as CollectionReference<item>).pipe(
    //   map(items => items.find(item => item.id === id))
    // );
    return docData<item>(
      doc(this.db, 'item/' + id) as DocumentReference<item>
    );
  }

  addItems(item: item) {
    const newID = doc(collection(this.db, 'item')).id;
    const itemRef = doc(this.db, 'item/', newID);
    return from(setDoc(itemRef, item));
  }

  deleteItem(id: string) {
    const itemRef = doc(this.db, 'item/' +id) as DocumentReference<item>;
    return from(deleteDoc(itemRef));
  }

  
  updateItem(item: item, id: string):Promise <void> {
    const itemRef = doc(this.db, 'item/' + id) as DocumentReference<item>;
    // return from(updateDoc(itemRef, {... item}));
    return updateDoc(itemRef, {... item});
  }

}
