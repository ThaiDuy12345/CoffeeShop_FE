import { Injectable, HostBinding } from "@angular/core";
import { NbToastrService } from '@nebular/theme';
@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(
    private toastrService: NbToastrService
  ){
  }

  success(title: string, content: string){
    this.toastrService.success(title, content, { limit: 3 });
  }

  info(title: string, content: string){
    this.toastrService.info(title, content, { limit: 3 });
  }

  warn(title: string, content: string){
    this.toastrService.warning(title, content, { limit: 3 });
  }

  error(title: string, content: string){
    this.toastrService.danger(title, content, { limit: 3 });
  }
}