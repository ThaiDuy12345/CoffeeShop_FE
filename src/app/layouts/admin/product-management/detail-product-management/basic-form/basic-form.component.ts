import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent {
  public icons: Icon = icons
  @Input() product: Product = new Product();
  constructor(
    private formatService: FormatService
  ){}
  formatDate(date: Date | string): string {
    if(date){
      return this.formatService.formatDate(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.formatDate(new Date())
  }

  timeSince(date: Date | string): string {
    if(date){
      return this.formatService.timeAgoSince(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.timeAgoSince(new Date())
  }
}
