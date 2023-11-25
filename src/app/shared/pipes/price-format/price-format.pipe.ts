import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {

  constructor(
    private formatService: FormatService,
  ) { }

  transform(value: any, ...args: any[]) {
    return this.formatService.formatPrice(value)
  }

}
