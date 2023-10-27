import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { CategoryData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit{
  public icons: Icon = icons
  @Input() onEditMode: Boolean = false
  @Input() product: Product = new Product();
  public categoryOptions: Category[] = []
  constructor(
    private formatService: FormatService
  ){}

  ngOnInit(): void {
    this.categoryOptions = CategoryData
  }

  formatDate(date: number): string {
    return this.formatService.formatDate(new Date(date))
  }

  timeSince(date: number): string {
    return this.formatService.timeAgoSince(new Date(date))
  }
}
