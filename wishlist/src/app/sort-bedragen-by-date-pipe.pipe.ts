import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { bedrag } from './bedrag/bedrag.model';

@Pipe({
  name: 'sortBedragenByDatePipe',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class SortBedragenByDatePipePipe implements PipeTransform {

  transform(bedrag: bedrag[]): bedrag[] {
    if(!bedrag || bedrag.length == 0)
    {
      return bedrag;
    }

    return bedrag.sort((a, b) => {
      const datumA = this.getDate(a.datum).getTime();
      const datumB = this.getDate(b.datum).getTime();

      return datumA - datumB;
    }).reverse();
  }

  // FireBase timestap to date object
  private getDate(dateField: any): Date {
    if (dateField && dateField.toDate) {
      return dateField.toDate();
    }
    return new Date(dateField);
  }


}
