import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private base_url = "https://coffeeshop-service.onrender.com/api"
  private service = {
    IMAGE: '/image',
    BANNER: '/banner'
  }

  imageService(): String {
    return this.base_url + this.service.IMAGE
  }

  bannerService(): String {
    return this.base_url + this.service.BANNER
  }
}