import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { item } from './item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: item[] = [];


  constructor(private http: HttpClient) { }

  getItems(): Observable<item[]> {
    const url = 'http://localhost:3000/item';
    return this.http.get<item[]>(url);
  }

  getItemsnPut(): void {
    const url = 'http://localhost:3000/item';
    this.http.get<item[]>(url).subscribe({
      next: (response: item[]) => {
        this.items = response;
      },
      error: (error) => console.log('error: ', error)
    });
  }

  getLastItems(): Observable<item[]> {
    const url = 'http://localhost:3000/item';

    return this.http.get<item[]>(url).pipe(
      map(items => items.slice(-5))
    );
  }

  getItem(id: string): Observable<item>{
    const url = 'http://localhost:3000/item/' + id;
    return this.http.get<item>(url);
  }

  addItems(item: item): Observable<item> {
    const url = 'http://localhost:3000/item';
    return this.http.post<item>(url, item).pipe(
      tap(() => {
        this.getItemsnPut();
      })
    );
  }

  deleteItem(id: string): Observable<any> {
    const url = 'http://localhost:3000/item/' + id;
    return this.http.delete(url).pipe(
      tap(() => {
        this.getItemsnPut();
      })
    )
  }

  
  updateItem(item: item): Observable<item> {
    const url = 'http://localhost:3000/item/' + item.id;
    return this.http.put<item>(url, item).pipe(
      tap(() => {
        this.getItemsnPut();
      })
    );
  }

}
