import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, count: number = 50) {
    const splitedVal = value.split('');

    if (splitedVal.length > count) {
      return splitedVal.slice(0, count).join('') + '...';
    }

    return value;
  }
}
