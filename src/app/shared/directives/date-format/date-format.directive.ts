import { Directive, ElementRef } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Directive({
  selector: '[appDateFormat]',
  standalone: true
})
export class DateFormatDirective {

  constructor(
    private formatService: FormatService,
    private elementRef: ElementRef
  ) { 
    this.elementRef.nativeElement.innerHTML = this.formatService.formatTimeStamp(this.elementRef.nativeElement.innerHTML) 
  }

}
