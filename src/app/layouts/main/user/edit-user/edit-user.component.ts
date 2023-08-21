import { Component, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from 'src/app/core/models/account.model';
import { vietnamSelection } from 'src/app/shared/utils/vietnam.utils';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: Account = new Account();
  public editUser: Account = new Account();
  public isEditing: Boolean = false;
  public provinces: any[] = [];
  public districts: any[] = [];
  public wards: any[] = [];
  public selectedProvince: string = '';
  public selectedDistrict: string = '';
  public selectedWard: string = '';
  public detailAddress: string = '';

  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.provinces = vietnamSelection.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
      };
    });
  }

  onClickCancelEdit(): void {
    this.isEditing = false;
    this.editUser = new Account();
  }

  onClickEdit(): void {
    this.isEditing = true;
    this.editUser = { ...this.user };
  }

  onChangeProvince(): void {
    const province = vietnamSelection.find(
      (c) => c.Id === this.selectedProvince
    );
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.detailAddress = '';
    this.wards = [];
    this.districts = [];
    if (!province) return;
    this.districts = province.Districts.map((d) => {
      return {
        id: d.Id,
        name: d.Name,
      };
    });
  }

  onChangeDistrict(): void {
    this.selectedWard = '';
    this.wards = [];
    this.detailAddress = '';
    const province = vietnamSelection.find(
      (c) => c.Id === this.selectedProvince
    );
    if (!province) return;
    const district = province.Districts.find(
      (d) => d.Id === this.selectedDistrict
    );
    if (!district) return;
    if (district.Wards.length === 1) {
      this.wards = [];
    } else {
      this.wards = district.Wards.map((w) => {
        if ('Id' in w && 'Name' in w)
          return {
            id: w.Id,
            name: w.Name,
          };
        else return null;
      });
    }
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, {
      context: 'Bạn có muốn xác nhận đổi thông tin?',
    });
  }

  onClickSubmit() {
    if (
      (this.wards.length > 0 && !this.selectedWard) ||
      !this.detailAddress ||
      !this.selectedProvince ||
      !this.selectedDistrict ||
      !this.editUser.name ||
      !this.editUser.phone ||
      !this.editUser.address
    ) {
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }

    this.dialogRef.close();
    this.messageService.success('Thay đổi thông tin thành công!!');
    this.isEditing = false;
  }
}
