import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string | any{ 
    // 06 - 01 - 201 | daysago
    return formatDistanceToNow(new Date(value), { locale: fr });
  }
}
