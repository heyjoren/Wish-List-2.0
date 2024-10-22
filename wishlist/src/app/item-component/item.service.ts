/*Backend service*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, from, map, tap } from 'rxjs';
import { item } from './item.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc, updateDoc, writeBatch } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytesResumable, Storage, deleteObject } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: item[] = [];
  ItemsUpdated = new Subject<item[]>();



  constructor(private db: Firestore, private storage : Storage) { }

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
    return docData<item>(
      doc(this.db, 'item/' + id) as DocumentReference<item>
    );
  }

  addItems(item: item, id: string) {
    const itemRef = doc(this.db, 'item/', id);
    return from(setDoc(itemRef, item));
  }

  deleteItem(id: string) {
    const itemRef = doc(this.db, 'item/' +id) as DocumentReference<item>;
    return from(deleteDoc(itemRef));
  }

  
  updateItem(item: item, id: string):Promise <void> {
    const itemRef = doc(this.db, 'item/' + id) as DocumentReference<item>;
    return updateDoc(itemRef, {... item});
  }

  createItemId(){
    const newID = doc(collection(this.db, 'item')).id;
    return newID;
  }

  async uploadImg(path: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task;
    const url = await getDownloadURL(storageRef);
    return url;

  }

  deleteImg(img: string) {
    const storageRef = ref(this.storage, img);
    const batch = writeBatch(this.db);
    return deleteObject(storageRef).then(() => {
      batch.commit();
    })
  }

}
