import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FormatService {
  timeAgoSince(date: number): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() -date) / 1000);

    if (diff < 60) {
      return `${diff} giây trước`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} phút trước`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} giờ trước`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)} ngày trước`;
    } else if (diff < 31536000) {
      return `${Math.floor(diff / 2592000)} tháng trước`;
    } else {
      return `${Math.floor(diff / 31536000)} năm trước`;
    }
  }

  timeFromNow(date: number): string {
    const now = new Date();
    const futureDate = date;
    const diff = Math.floor((futureDate - now.getTime()) / 1000);
  
    if (diff < 60) {
      return `trong ${diff} giây`;
    } else if (diff < 3600) {
      return `trong ${Math.floor(diff / 60)} phút`;
    } else if (diff < 86400) {
      return `trong ${Math.floor(diff / 3600)} giờ`;
    } else if (diff < 2592000) {
      return `trong ${Math.floor(diff / 86400)} ngày`;
    } else if (diff < 31536000) {
      return `trong ${Math.floor(diff / 2592000)} tháng`;
    } else {
      return `trong ${Math.floor(diff / 31536000)} năm`;
    }
  }
  

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }

  private formatDate(date: Date): string {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  formatTimeStamp(timeStamp: number): string {
    return this.formatDate(new Date(timeStamp))
  }
}
