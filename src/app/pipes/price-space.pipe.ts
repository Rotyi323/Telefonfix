import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceSpace',
  standalone: true,
})
export class PriceSpacePipe implements PipeTransform {
  transform(value: number): string {
    const str = value.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
  }
}
