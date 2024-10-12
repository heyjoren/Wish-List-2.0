import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, Subject   } from 'rxjs';
import { bedrag } from './bedrag.model';


@Injectable({
  providedIn: 'root'
})
export class BedragService {
  bedragen: bedrag[] = [];
  bedragenUpdated = new Subject<bedrag[]>();
  selectedItemId: string | null = null;

  constructor(private http: HttpClient) { }

  getBedragen(): Observable<bedrag[]> {
    const url = 'http://localhost:3000/bedrag';
    return this.http.get<bedrag[]>(url);
  }

  getBedragenPut(): void {
    const url = 'http://localhost:3000/bedrag';
    this.http.get<bedrag[]>(url).subscribe({
      next: (response: bedrag[]) => {
        this.bedragen = response;
        this.bedragenUpdated.next(this.bedragen);
      },
      error: (error) => console.log('error: ', error)
    });
  }

  getLastBedragen(): Observable<bedrag[]> {
    const url = 'http://localhost:3000/bedrag';

    return this.http.get<bedrag[]>(url).pipe(
      map(bedragen => bedragen.slice(-5))
    );
  }

  addBedrag(bedrag: bedrag): Observable<bedrag> {
    const url = 'http://localhost:3000/bedrag';
    return this.http.post<bedrag>(url, bedrag).pipe(
      tap(() => {
        this.getBedragenPut();
      })
    );
  }

  deleteBedrag(id: string): Observable<any> {
    const url = 'http://localhost:3000/bedrag/' + id;
    return this.http.delete(url).pipe(
      tap(() => {
        this.getBedragenPut();
      })
    )
  }

}
