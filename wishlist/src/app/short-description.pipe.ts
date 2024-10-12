import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string, limit?: number): string | null {
    if (!value) {
      return null;
    }
    const actualLimit = (limit) ? limit : 150;
    if (value.length > actualLimit) {
      return value.substring(0, actualLimit) + '...';
    } else {
      return value;
    }
  }
}
