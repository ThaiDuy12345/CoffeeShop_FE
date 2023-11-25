import { Directive, ElementRef } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Directive({
  selector: '[appPriceFormat]',
  standalone: true
})
export class PriceFormatDirective {

  constructor(
    private formatService: FormatService,
    private elementRef: ElementRef
  ) { 
    this.elementRef.nativeElement.innerHTML = this.formatService.formatPrice(this.elementRef.nativeElement.innerHTML) 
  }

}
