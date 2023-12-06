import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  // "aze aze aze aze aze aze aze aze" | truncate : 4
  transform(value: any, limit = 10, end = ' ...', ...args: any[]): any {
    let shortValue = '';
    if (value) {
      let words = value.split(/\s+/);
      if(words.length > limit ) { // truncate | 15
        shortValue = words.slice(0, limit).join(' ') + end;
      } else {
        shortValue = value; // truncate
      }
    }

    return shortValue;
  }

}
