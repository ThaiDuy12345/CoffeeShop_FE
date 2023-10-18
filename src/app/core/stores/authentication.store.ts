import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Account } from '../models/account.model';

export interface AuthenticationState {
  account: Account
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'filter' })
export class AuthenticationStore extends Store<AuthenticationState> {
  constructor() {
    super({ account: new Account() });
  }
}
