import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface FilterState {
  category: string[]
  search: string
  view: string
}



@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'filter' })
export class FilterStore extends Store<FilterState> {
  constructor() {
    super({ category: [], search: '', view: '' });
  }
}
