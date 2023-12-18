import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { ProductService } from 'src/app/core/services/product.service';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent {
  public icons: Icon = icons
  public categories: Category[] = []
  public detailVisible: boolean = false
  public inforVisible: boolean = false
  public choosingCategory: Category = new Category()
  public isLoading: boolean = false
  public searchInput: string = ''
  public currentEditIndex: number = -1
  public currentEditItem: Category = new Category()
  public isLoadingButton: boolean = false
  public isNewMode: boolean = false
  public isDetailLoading: boolean = false
  public choosingCategoryProduct: Product[] = []
  constructor(
    private messageService: NzMessageService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private mappingService: MappingService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.categoryService.getAll().pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe({
      next: (res) => {
        if(res.status){
          this.categories = res.data.map((acc: any) => this.mappingService.category(acc))
          if(this.searchInput) this.categories =  this.categories.filter(d => d.id.toString().includes(this.searchInput.toLowerCase()) || d.name.toLowerCase().includes(this.searchInput.toLowerCase()))
        }else{
          this.messageService.error(res.message)
        }
      },
      error: (err) => {
        this.messageService.error(err.error.message)
      }
    })
  }

  filterBySearch(): void {
    this.initData()
  }

  viewACategory(data: Category): void {
    if(!data) return
    this.choosingCategory = data
    this.choosingCategoryProduct = []
    this.getProductByCategory()
  }

  onClickCancelEditCategory(): void {
    this.currentEditIndex = -1
    this.currentEditItem = new Category()

    if(this.isNewMode){
      const arr = [...this.categories]
      arr.shift()
      this.categories = [...arr]
      this.isNewMode = false
    }
  }

  onClickAddNewCategory(): void {
    this.categories = [
      new Category,
      ...this.categories
    ]
    this.currentEditIndex = 0
    this.isNewMode = true
  }

  onClickEditCategory(index: number): void {
    this.currentEditIndex = index
    this.currentEditItem = {...this.categories[index]}
  }

  onClickSubmitDeleteCategory(index: number): void {
    this.isLoadingButton
    this.categoryService.delete({ categoryId: this.categories[index].id }).pipe(finalize(() => this.isLoadingButton = false )).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Xoá danh mục thành công")
          this.initData()
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  getProductByCategory(): void{
    this.isDetailLoading = true
    this.productService.getByCategory({ categoryId: this.choosingCategory.id }).pipe(
      finalize(() => this.isDetailLoading = false)
    ).subscribe({
      next: res => {
        if(res.status){
          this.choosingCategoryProduct = res.data.map((p: any) => this.mappingService.product(p))
        }else{
          this.messageService.error(res.error.message)

        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  onClickSaveCategory(): void {
    if(!this.currentEditItem.name){
      this.messageService.error("Bạn cần điền hết thông tin để tiếp tục!!")
      return
    }
    this.isLoadingButton = true
    const observable: Observable<any> = this.currentEditItem.id ?
      this.categoryService.put(this.currentEditItem.id, {
        categoryName: this.currentEditItem.name
      })
      :
      this.categoryService.post({
        categoryId: "",
        categoryName: this.currentEditItem.name
      })

    observable.pipe(finalize(() => this.isLoadingButton = false )).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Thao tác thành công")
          this.onClickCancelEditCategory()
          this.initData()
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

}
