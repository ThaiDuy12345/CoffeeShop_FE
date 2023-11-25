import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Category } from 'src/app/core/models/category.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrl: './basic-form.component.scss'
})
export class BasicFormComponent implements OnInit{
  public icons: Icon = icons
  @Input() onEditMode: boolean = false
  @Input() product: Product = new Product();
  @Input() editProduct: Product = new Product()
  @Input() isLoadingSubmitButton: boolean = false
  public selectedCategory: string = ""
  public categoryOptions: Category[] = []
  constructor(
    private categoryService: CategoryService,
    private messageService: NzMessageService
  ){}

  ngOnInit(): void {
    this.initCategoryData()
  }

  initCategoryData(): void {
    this.categoryService.getAll().subscribe({
      next: res => {
        if(res.status){
          this.categoryOptions = res.data.map((c: any) => {
            return {
              name: c.categoryName,
              id: c.categoryId
            }
          })
        }else{
          this.messageService.error(res.message)
        }
      },  
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  onChangeCategory(value: string): void {
    const result = this.categoryOptions.find(c => c.id === value)
    if(result){
      this.editProduct.category = result
    }
  }
}
