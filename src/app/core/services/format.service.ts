import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FormatService {
  timeAgoSince(date: Date): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

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

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }
}
