import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    private formatService: FormatService,
  ) { }

  transform(value: any, ...args: any[]): String {
    return this.formatService.formatTimeStamp(value)
  }
}
