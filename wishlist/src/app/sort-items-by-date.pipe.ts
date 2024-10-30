import { Pipe, PipeTransform } from '@angular/core';
import { item } from './item-component/item.model';

@Pipe({
  name: 'sortItemsByDate',
  standalone: true
})
export class SortItemsByDatePipe implements PipeTransform {

  transform(items: item[]): item[] {
    if(!items || items.length == 0)
    {
      return items;
    }

    return items.sort((a, b) => {
      const datumA = this.getDate(a.toegevoegOp).getTime();
      const datumB = this.getDate(b.toegevoegOp).getTime();

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
