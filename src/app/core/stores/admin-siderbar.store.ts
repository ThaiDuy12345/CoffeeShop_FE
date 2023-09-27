import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AdminSidebarState {
  state: "expanded" | "collapsed" | "compacted"
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'filter' })
export class AdminSidebarStore extends Store<AdminSidebarState> {
  constructor() {
    super({ state: "expanded" });
  }
}
