import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminSidebarStore } from 'src/app/core/stores/admin-siderbar.store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy{
  public state: "expanded" | "collapsed" | "compacted" = "expanded"
  public initAdminSidebarState = new Subject<any>();
  constructor(
    private adminSidebarStore: AdminSidebarStore
  ){}

  ngOnInit(): void {
    this.initAdminSidebarState.subscribe(state => {
      this.state = state.state
    })
    this.adminSidebarStore._select((state) => state).subscribe(this.initAdminSidebarState);
  }

  ngOnDestroy(): void {
    this.initAdminSidebarState.complete()
  }
}
