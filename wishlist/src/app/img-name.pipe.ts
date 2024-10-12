import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgName',
  standalone: true
})
export class ImgNamePipe implements PipeTransform {

  transform(value: string): string {
    const startIndex = value.lastIndexOf('\\') + 1;
    return value.substring(startIndex);
  }

}
