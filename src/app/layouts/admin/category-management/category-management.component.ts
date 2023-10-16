import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { Icon } from 'src/app/core/models/icon.model';
import { CategoryData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent {
  public categories: Category[] = CategoryData
  public icons: Icon = icons
}
