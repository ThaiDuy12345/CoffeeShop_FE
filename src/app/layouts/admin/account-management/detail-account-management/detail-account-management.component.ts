import { Component, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from 'src/app/core/models/account.model';
import { AccountData } from 'src/app/data/data';
import { vietnamSelection } from 'src/app/shared/utils/vietnam.utils';

@Component({
  selector: 'app-detail-account-management',
  templateUrl: './detail-account-management.component.html',
  styleUrls: ['./detail-account-management.component.scss']
})
export class DetailAccountManagementComponent {
  public choosingAccount: Account = new Account()
  public editAccount: Account = new Account()
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if(!id) return
      const result = AccountData.find(a => a.id === id)
      if(result) this.choosingAccount = result
    })
    this.provinces = vietnamSelection.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
      };
    });

  }

  onClickCancelEdit(): void {
    this.editAccount = new Account();
    this.router.navigateByUrl('/admin/account-management')
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
      !this.editAccount.name ||
      !this.editAccount.phone
    ) {
      console.log(this.editAccount.address)
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }

    this.dialogRef.close();
    this.messageService.success('Thay đổi thông tin thành công!!');
    this.router.navigateByUrl('/admin/account-management')
  }
}
