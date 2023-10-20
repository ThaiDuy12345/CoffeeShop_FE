import { Component, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Icon } from 'src/app/core/models/icon.model';
import { AccountService } from 'src/app/core/services/account.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { vietnamSelection } from 'src/app/shared/utils/vietnam.utils';

@Component({
  selector: 'app-detail-account-management',
  templateUrl: './detail-account-management.component.html',
  styleUrls: ['./detail-account-management.component.scss']
})
export class DetailAccountManagementComponent {
  public icons: Icon = icons
  public isNew: boolean = false
  public choosingAccount: Account = new Account()
  public editAccount: Account = new Account()
  public provinces: any[] = [];
  public districts: any[] = [];
  public wards: any[] = [];
  public options: string[] = [
    "Quản trị viên", "Nhân viên", "Khách hàng"
  ]
  public optionIndex?: number = undefined
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
  public isLoading: boolean = false;

  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private accountService: AccountService,
  ){}

  ngOnInit(): void {
    this.initAccount()
    this.provinces = vietnamSelection.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
      };
    });
  }

  initAccount(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if(!id) {
        this.isNew = true
        this.optionIndex = 2
        return
      }
      this.isLoading = true
      this.accountService.getByPhone({ accountPhone: id }).pipe(
        finalize(() => {
          this.isLoading = false
          this.optionIndex = this.editAccount.role
        })
      ).subscribe({
        next: (res) => {
          this.choosingAccount = {
            name: res.data.accountName,
            phone: res.data.accountPhone,
            address: res.data.accountAddress,
            active: res.data.accountActive,
            role: res.data.accountRole,
            password: res.data.accountPassword,
            email: res.data.accountEmail
          }

          this.editAccount = { ...this.choosingAccount }
        },
        error: (err: any) => this.messageService.error(err.error.message)
      })
    })
  }

  onClickCancelEdit(): void {
    this.editAccount = new Account();
    this.selectedProvince = {
      name: "",
      id: ""
    };
    this.selectedDistrict = {
      name: "",
      id: ""
    };
    this.selectedWard = {
      name: "",
      id: ""
    };
    this.districts = [];
    this.wards = [];
    this.detailAddress = ""
    this.optionIndex = 2
    this.router.navigateByUrl('admin/account-management')
  }

  onChangeProvince(): void {
    const province = vietnamSelection.find(
      (c) => c.Id === this.selectedProvince.id
    );
    this.selectedDistrict = {
      id: "",
      name: ""
    };
    this.selectedWard = {
      id: "",
      name: ""
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
      id: "",
      name: ""
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

  handleIndexChange(role: number): void {
    this.editAccount.role = this.optionIndex === 0 ? 0 : this.optionIndex === 1 ? 1 : 2
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, {
      context: 'Bạn có muốn xác nhận đổi thông tin?',
    });
  }


  isAddressCorrect(): boolean {
    if(
      !this.selectedProvince.id && 
      !this.selectedDistrict.id && 
      !this.selectedWard.id && 
      !this.detailAddress
    ){
      return true
    }
    
    if (this.wards.length === 0 && !this.selectedWard.id) 
      return this.detailAddress.length > 0 &&
        this.selectedProvince.id.length > 0 &&
        this.selectedDistrict.id.length > 0
    
    return this.detailAddress.length > 0 &&
      this.selectedProvince.id.length > 0 &&
      this.selectedDistrict.id.length > 0 &&
      this.selectedWard.id.length > 0
    
  }

  formatAddress(): string {
    if(
      !this.selectedProvince.id && 
      !this.selectedDistrict.id && 
      !this.selectedWard.id && 
      !this.detailAddress
    )
      return this.choosingAccount.address
    
    return this.selectedWard.id ? 
      `${this.detailAddress}, ${this.selectedWard.name}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
      :
      `${this.detailAddress}, ${this.selectedDistrict.name}, ${this.selectedProvince.name}, Việt Nam` 
  }

  onClickSubmit() {
    console.log(this.editAccount)
    if (
      !this.isAddressCorrect() ||
      !this.editAccount.name ||
      !this.editAccount.phone ||
      !this.editAccount.password ||
      !this.editAccount.email
    ) {
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }
    this.submitLoading = true
    const formatAddress = this.formatAddress()
    
    const observable: Observable<any> = ( this.choosingAccount.phone && !this.isNew ) ? 
      this.accountService.put(this.choosingAccount.phone, {
        accountEmail: this.editAccount.email,
        accountName: this.editAccount.name,
        accountAddress: formatAddress,
        accountPassword: this.choosingAccount.password,
        accountRole: this.editAccount.role,
        accountActive: this.choosingAccount.active
      })
        :
      this.accountService.register({
        accountPhone: "+84" + this.editAccount.phone.substring(1),
        accountEmail: this.editAccount.email,
        accountName: this.editAccount.name,
        accountAddress: formatAddress,
        accountPassword: this.editAccount.password,
        accountRole: this.editAccount.role,
        accountActive: true
      })
    observable.pipe(finalize(() => {
      this.dialogRef.close();
      this.submitLoading = false
    })).subscribe({
      next: (res: any) => {
        if(res.status){
          this.messageService.success('Thao tác thành công');
          this.onClickCancelEdit()
        }else {
          this.messageService.error('Thao tác thất bại');
        }
      },
      error: (err: any) => {
        this.messageService.error(err.error.message);
      }
    })
  }

  isEmailValidate(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.editAccount.email)
  }

  isPasswordValidate(): Boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.editAccount.password)
  }
}
