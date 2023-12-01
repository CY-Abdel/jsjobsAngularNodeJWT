import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate' // "23135 16545646" | toShortDate
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]) : any {
    
    if (value.toLowerCase() === 'asap') {
      return "now";
    } else if (value.indexOf('-') > -1 ) {
      let fullDate, rest;
      // '2023-11-11T10:32:33' => ['2023-11-11', '10:32:33']
      [fullDate, rest] = value.toLowerCase().split('t'); 

      let year, month, date;
      [year, month, date] = fullDate.split('-'); // ['2017', '11', '30']
      
      return `${date}/${month}/${year}`;
    } else {
      return '--';
    }
  }
}
