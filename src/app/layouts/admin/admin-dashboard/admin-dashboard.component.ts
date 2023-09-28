import { Component } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  public icons: Icon = icons
  public time: string = 'Tuần vừa qua'
  public type: string = 'Tài khoản được tạo'
  public timeOptions: string[] = ['Tuần vừa qua', 'Tháng vừa qua', '6 tháng vừa qua', 'Năm vừa qua'];
  public typeOptions: string[] = ['Tài khoản được tạo', 'Sản phẩm bán ra', 'Hoá đơn', 'Phản hồi', 'Thư hỗ trợ'];

  timeChange(value: number): void {
    this.time = this.timeOptions[value]
  }

  typeChange(value: number): void {
    this.type = this.typeOptions[value]
  }
}
