import { Component, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Icon } from 'src/app/core/models/icon.model';
import { District, Province, Ward } from 'src/app/core/models/vietnam.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { VietnamService } from 'src/app/core/services/vietnam.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { vietnamSelection } from 'src/app/shared/utils/vietnam.utils';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: Account = new Account();
  public icons: Icon = icons
  public editUser: Account = new Account();
  public isEditing: Boolean = false;
  public provinces: Province[] = [];
  public districts: District[] = [];
  public wards: Ward[] = [];
  public submitLoading: boolean = false
  public selectedProvince: { name: string, code: number } = {
    name: "",
    code: 0
  };
  public selectedDistrict: { name: string, code: number } = {
    name: "",
    code: 0
  };
  public selectedWard: { name: string, code: number } = {
    name: "",
    code: 0
  };
  public detailAddress: string = '';

  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private accountService: AccountService,
    private authenService: AuthService,
    private vietnamService: VietnamService
  ) {}

  ngOnInit(): void {
    this.vietnamService.getAll().subscribe({
      next: (data: Province[]) => this.provinces = data,
      error: err => {
        this.provinces = vietnamSelection
      }
    })
  }

  onClickCancelEdit(): void {
    this.isEditing = false;
    this.editUser = new Account();
    this.selectedProvince = {
      name: "",
      code: 0
    };
    this.selectedDistrict = {
      name: "",
      code: 0
    };
    this.selectedWard = {
      name: "",
      code: 0
    };

    this.districts = [];
    this.wards = [];
    this.detailAddress = ""
  }

  onClickEdit(): void {
    this.isEditing = true;
    this.editUser = { ...this.user };
  }

  onChangeProvince(): void {
    const province = this.provinces.find(
      (c) => c.code === this.selectedProvince.code
    );
    this.selectedDistrict = {
      name: "",
      code: 0
    };
    this.selectedWard = {
      name: "",
      code: 0
    };
    this.detailAddress = '';
    this.wards = [];
    this.districts = [];
    if (!province) return;
    this.districts = province.districts
  }

  onChangeDistrict(): void {
    this.selectedWard = {
      name: "",
      code: 0
    };
    this.wards = [];
    this.detailAddress = '';
    const province = this.provinces.find(
      (c) => c.code === this.selectedProvince.code
    );
    if (!province) return;
    const district = province.districts.find(
      (d) => d.code === this.selectedDistrict.code
    );
    if (!district) return;
    if (district.wards.length === 1) {
      this.wards = [];
    } else {
      this.wards = district.wards
    }
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, {
      context: 'Bạn có muốn xác nhận đổi thông tin?',
    });
  }

  isAddressCorrect(): boolean {
    if(
      !(this.selectedProvince.code !== 0) && 
      !(this.selectedDistrict.code !== 0) && 
      !(this.selectedWard.code !== 0) && 
      !this.detailAddress
    ){
      return true
    }
      
    
    if (this.wards.length === 0 && !(this.selectedWard.code !== 0)) 
      return this.detailAddress.length > 0 &&
        this.selectedProvince.code !== 0 &&
        this.selectedDistrict.code !== 0
    
    return this.detailAddress.length > 0 &&
      this.selectedProvince.code !== 0 &&
      this.selectedDistrict.code !== 0 &&
      this.selectedWard.code !== 0
    
  }

  formatAddress(): string {
    if(
      !(this.selectedProvince.code !== 0) && 
      !(this.selectedDistrict.code !== 0) && 
      !(this.selectedWard.code !== 0) && 
      !this.detailAddress
    )
      return this.user.address
    
    return this.selectedWard.code !== 0 ? 
      `${this.detailAddress}, ${this.selectedWard.name}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
      :
      `${this.detailAddress}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
  }

  onClickSubmit() {
    if (
      !this.isAddressCorrect() ||
      !this.editUser.name ||
      !this.editUser.email
    ) {
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }
    this.submitLoading = true
    const formatAddress = this.formatAddress()
    
    this.accountService.put(this.user.phone, {
      accountEmail: this.editUser.email,
      accountName: this.editUser.name,
      accountAddress: formatAddress,
      accountPassword: this.user.password,
      accountRole: this.user.role,
      accountActive: this.user.active
    }).pipe(finalize(() => {
      this.dialogRef.close();
      this.submitLoading = false
    })).subscribe({
      next: (res) => {
        if(res.status){
          this.messageService.success('Thay đổi thông tin cá nhân thành công');
          this.authenService.saveAccountToStore(res.data)
          this.isEditing = false;
          this.onClickCancelEdit()
        }else {
          this.messageService.error('Thay đổi thông tin thất bại');
        }
      },
      error: (err) => {
        this.messageService.error(err.error.message);
      }
    })
  }

  isEmailValidate(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.editUser.email)
  }
}
