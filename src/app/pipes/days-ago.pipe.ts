import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: string | Date, ...args: any[]): string | Date { 
    // 06/01/2023 | daysago
    return formatDistanceToNow(new Date(value), { locale: fr });
  }
}
