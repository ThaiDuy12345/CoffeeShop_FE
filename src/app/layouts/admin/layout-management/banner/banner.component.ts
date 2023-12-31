import { BannerService } from 'src/app/core/services/banner.service';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/core/services/image.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{
  public icons: Icon = icons
  public mainBanner: string = ""
  public popupBanner: string = ""
  public isLoadingMainBanner: boolean = false
  public isLoadingCancelMainBanner: boolean = false
  public isLoadingPopupBanner: boolean = false
  public isLoadingCancelPopupBanner: boolean = false
  constructor(
    private bannerService: BannerService,
    private imageService: ImageService,
    private messageService: NzMessageService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.bannerService.getMainBanner().subscribe(res => {
      if(res.status === true){
        this.mainBanner = res.data.url
      }
    })
    this.bannerService.getPopupBanner().subscribe(res => {
      if(res.status === true){
        this.popupBanner = res.data.url
      }
    })
  }

  onMainBannerInputChange(files: FileList | null, type: 'DEFAULT' | 'RESET' = 'DEFAULT'): void {
    if(!files && type === 'DEFAULT') return
    
    if(type === 'DEFAULT' && files){
      this.isLoadingMainBanner = true
      const formData = new FormData()
      formData.append('file', files[0])
      this.bannerService.updateBanner({ type: "main", formData: formData }).subscribe(res => {
        if(res.status === true){
          this.mainBanner = "ádasd"
          this.mainBanner = res.data.url
          this.isLoadingMainBanner = false
          this.messageService.success("Cập nhật ảnh thành công!!");
        }else {
          this.isLoadingMainBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    }else {
      this.isLoadingCancelMainBanner = true
      this.bannerService.resetBanner({ type: "main" }).subscribe(res => {
        if(res.status === true){
          this.mainBanner = res.data.url
          this.isLoadingCancelMainBanner = false
          this.messageService.success("Cập nhật ảnh thành công!!");
        }else {
          this.isLoadingCancelMainBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    } 
  }

  onPopUpBannerInputChange(files: FileList | null, type: 'DEFAULT' | 'RESET' = 'DEFAULT'): void {
    if(!files && type === 'DEFAULT') return
    
    if(type === 'DEFAULT' && files){
      this.isLoadingPopupBanner = true
      const formData = new FormData()
      formData.append('file', files[0])

      this.bannerService.updateBanner({ type: "pop_up", formData: formData }).subscribe(res => {
        if(res.status === true){
          this.popupBanner = res.data.url
          this.isLoadingPopupBanner = false
          this.messageService.success("Cập nhật ảnh thành công!!");
        }else {
          this.isLoadingPopupBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    }else {
      this.isLoadingCancelPopupBanner = true
      this.bannerService.resetBanner({ type: "pop_up" }).subscribe(res => {
        if(res.status === true){
          this.popupBanner = res.data.url
          this.isLoadingCancelPopupBanner = false
          this.messageService.success("Cập nhật ảnh thành công!!");
        }else {
          this.isLoadingCancelPopupBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    } 
  }
}
