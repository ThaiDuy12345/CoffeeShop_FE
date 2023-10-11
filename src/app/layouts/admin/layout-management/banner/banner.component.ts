import { BannerService } from 'src/app/core/services/banner.service';
import { Banner } from './../../../../core/models/banner.model';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/core/services/image.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  public icons: Icon = icons
  public mainBanner: Banner = new Banner()
  public popupBanner: Banner = new Banner()
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
      if(res.status === 200){
        this.mainBanner = {
          id: res.data._id,
          image: {
            id: res.data.image._id,
            url: res.data.image.url
          }
        }
      }
    })
    this.bannerService.getPopupBanner().subscribe(res => {
      if(res.status === 200){
        this.popupBanner = {
          id: res.data._id,
          image: {
            id: res.data.image._id,
            url: res.data.image.url
          }
        }
      }
    })
  }

  onMainBannerInputChange(files: FileList | null, type: 'DEFAULT' | 'RESET' = 'DEFAULT'): void {
    if(!files && type === 'DEFAULT') return
    
    if(type === 'DEFAULT' && files){
      this.isLoadingMainBanner = true
      const formData = new FormData()
      formData.append('file', files[0])
      this.imageService.addNewImage(formData).subscribe(res => {
        if(res.status === 200){
          this.bannerService.updateMainBanner(res.data._id).subscribe(res2 => {
            if(res2.status === 200){
              this.mainBanner.image = {
                id: res2.data.image._id,
                url: res2.data.image.url
              }
              this.isLoadingMainBanner = false
              this.messageService.success("Cập nhật ảnh thành công!!");
            }else {
              this.isLoadingMainBanner = false
              this.messageService.error("Cập nhật ảnh thất bại!!");
            }
          })
        }else {
          this.isLoadingMainBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    }else {
      this.isLoadingCancelMainBanner = true
      this.bannerService.updateMainBanner().subscribe(res2 => {
        if(res2.status === 200){
          this.mainBanner.image = {
            id: res2.data.image._id,
            url: res2.data.image.url
          }
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
      this.imageService.addNewImage(formData).subscribe(res => {
        if(res.status === 200){
          this.bannerService.updatePopupBanner(res.data._id).subscribe(res2 => {
            if(res2.status === 200){
              this.popupBanner.image = {
                id: res2.data.image._id,
                url: res2.data.image.url
              }
              this.isLoadingPopupBanner = false
              this.messageService.success("Cập nhật ảnh thành công!!");
            }else {
              this.isLoadingPopupBanner = false
              this.messageService.error("Cập nhật ảnh thất bại!!");
            }
          })
        }else {
          this.isLoadingPopupBanner = false
          this.messageService.error("Cập nhật ảnh thất bại!!");
        }
      })
    }else {
      this.isLoadingCancelPopupBanner = true
      this.bannerService.updatePopupBanner().subscribe(res2 => {
        if(res2.status === 200){
          this.popupBanner.image = {
            id: res2.data.image._id,
            url: res2.data.image.url
          }
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
