/*Backend service*/
import { Injectable } from '@angular/core';
import { Observable, Subject, from, map } from 'rxjs';
import { item } from './item.model';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, query, setDoc, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytesResumable, Storage, deleteObject } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { SortItemsByDatePipe } from '../sort-items-by-date.pipe';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: item[] = [];
  ItemsUpdated = new Subject<item[]>();



  constructor(private db: Firestore, private storage : Storage, private auth: AuthService, private sortItemsByDatePipe: SortItemsByDatePipe) { }

  getItems(): Observable<item[]> {
    return collectionData<item>(
    query(
        collection(this.db, 'item') as CollectionReference<item>,
        where("uid", "==", this.auth.getUid())
      ),
      { idField: 'id' }
    );
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
      map(items => this.sortItemsByDatePipe.transform(items)),
      map(sortedItems => sortedItems.slice(0, 5))
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

  deleteItem(item: item) {
    const itemRef = doc(this.db, 'item/' + item.id) as DocumentReference<item>;
    if (item.img){
      console.log("if");
      this.deleteImg(item.img);
    }
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