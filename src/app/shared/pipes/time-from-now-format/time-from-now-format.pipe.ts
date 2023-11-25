import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Pipe({
  name: 'timeFromNowFormat',
  standalone: true
})
export class TimeFromNowFormatPipe implements PipeTransform {

  constructor(
    private formatService: FormatService,
  ) { }

  transform(value: any, ...args: any[]): String {
    return this.formatService.timeFromNow(value)
  }

}
