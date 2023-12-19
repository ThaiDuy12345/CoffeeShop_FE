import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { AccountService } from 'src/app/core/services/account.service';
import { Subject, finalize, from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent implements OnInit {
  private tempSubject: Subject<any> = new Subject();
  public visible: boolean = false
  public icons: Icon = icons
  public user = {
    label: `Xin chào`,
    name: '',
    icon: 'user',
    tag: 'user-tag',
    subItems: [
      {
        title: 'THÔNG TIN',
        icon: icons['faCircleInfo'],
        link: '/main/user'
      },
      {
        title: 'ĐĂNG XUẤT',
        icon: icons['faArrowRightFromBracket'],
      },
    ],
  };
  constructor(
    private router: Router,
    private message: NzMessageService,
    private authenticationStore: AuthenticationStore,
    private authService: SocialAuthService
  ) {}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.tempSubject.subscribe({
      next: (res) => this.user.name = res.account.name
    })
    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  onClickSignOut(): void {
    from(this.authService.signOut()).pipe(
      finalize(() => {
        Cookies.remove('id')
        this.router.navigate(['/sign-in']);
        this.message.success(
          `Đăng xuất thành công, Tạm biệt bạn ${this.user.name}`
        );
      })
    ).subscribe({
      error: err => console.log(err)
    })
  }

  isMobileScreen(): Boolean {
    return window.innerWidth < 1050
  }
}
