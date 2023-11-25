import { Pipe, PipeTransform } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';

@Pipe({
  name: 'timeAgoSinceFormat',
  standalone: true
})
export class TimeAgoSinceFormatPipe implements PipeTransform {

  constructor(
    private formatService: FormatService,
  ) { }

  transform(value: any, ...args: any[]): String {
    return this.formatService.timeAgoSince(value)
  }

}
