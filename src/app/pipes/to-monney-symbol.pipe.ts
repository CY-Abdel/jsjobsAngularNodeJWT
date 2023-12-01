import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMonneySymbol'
})
export class ToMonneySymbolPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    switch (value.toLowerCase()) {
      case 'eu':
        return '€';
      case 'pounds':
        return '£';
      case 'cfa':
        return 'CFA';
      case 'cad':
        return '$';
      default:
        return value;
    }
  }
}
