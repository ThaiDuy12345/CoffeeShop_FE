import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface FilterState {
  category: string[]
  search: string
  view: string
  order: 0 | 1 | 2
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'filter' })
export class FilterStore extends Store<FilterState> {
  constructor() {
    super({ category: [], search: '', view: '', order: 0 });
  }
}
