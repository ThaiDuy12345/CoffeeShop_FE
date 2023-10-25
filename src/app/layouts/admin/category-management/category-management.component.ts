import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Icon } from 'src/app/core/models/icon.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
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
  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private categoryService: CategoryService
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
          this.categories = res.data.map((acc: any) => {
            return {
              id: acc.categoryId,
              name: acc.categoryName,
              products: acc.productEntities.map((p: any) => {
                return {
                  id: p.productId,
                  name: p.productName,
                  description: p.productDescription,
                  imageUrl: p.productImageUrl,
                  creationDate: p.productCreationDate,
                  isPopular: p.productIsPopular,
                  active: p.productActive,
                  category: undefined
                }
              })
            }
          })

          if(this.searchInput) this.categories =  this.categories.filter(d => d.name.toLowerCase().includes(this.searchInput.toLowerCase()))
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

  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date)
  }

  formatNumber(data: number): string {
    return this.formatService.formatPrice(data)
  }

  viewACategory(data: Category): void {
    if(!data) return
    this.choosingCategory = data
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
    this.currentEditItem = this.categories[index]
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
