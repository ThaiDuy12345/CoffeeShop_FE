import { Component, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';
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
  public submitLoading: boolean = false
  public selectedProvince: {name: string, id: string} = {
    name: "",
    id: ""
  };
  public selectedDistrict: {name: string, id: string} = {
    name: "",
    id: ""
  };
  public selectedWard: {name: string, id: string} = {
    name: "",
    id: ""
  };
  public detailAddress: string = '';

  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private accountService: AccountService
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
      (c) => c.Id === this.selectedProvince.id
    );
    this.selectedDistrict = {
      name: "",
      id: ""
    };
    this.selectedWard = {
      name: "",
      id: ""
    };
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
    this.selectedWard = {
      name: "",
      id: ""
    };
    this.wards = [];
    this.detailAddress = '';
    const province = vietnamSelection.find(
      (c) => c.Id === this.selectedProvince.id
    );
    if (!province) return;
    const district = province.Districts.find(
      (d) => d.Id === this.selectedDistrict.id
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
      (this.wards.length > 0 && !this.selectedWard.id) ||
      !this.detailAddress ||
      !this.selectedProvince.id ||
      !this.selectedDistrict.id ||
      !this.editUser.name ||
      !this.editUser.phone
    ) {
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }
    this.submitLoading = true
    const formatAddress = this.selectedWard ? 
      `${this.detailAddress}, ${this.selectedWard.name}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
      :
      `${this.detailAddress}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
    
    this.accountService.put(this.user.phone, {
      accountName: this.editUser.name,
      accountAddress: formatAddress,
      accountPassword: this.user.password,
      accountRole: this.user.role,
      accountActive: this.user.active
    }).subscribe({
      next: (res) => {
        this.dialogRef.close();
        this.submitLoading = false
        if(res.status){
          this.messageService.success('Thay đổi thông tin cá nhân thành công');
          this.user.name = res.data.accountName
          this.user.address = res.data.accountAddress
          this.isEditing = false;
        }else {
          this.messageService.error('Thay đổi thông tin thất bại');
          this.isEditing = false;
        }
      },
      error: (err) => {
        this.dialogRef.close();
        this.submitLoading = false
        console.log(err.error.message)
        this.messageService.error('Đã có lỗi xảy ra');
        this.isEditing = false;
      }
    })

    
  }
}
