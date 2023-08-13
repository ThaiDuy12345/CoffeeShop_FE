import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(
    
  ){}

  success(title: string, content: string){
    // this.messageService.add({
    //   severity:'success',
    //   summary: title,
    //   detail: content
    // })
  }

  info(title: string, content: string){
    // this.messageService.add({
    //   severity: 'info',
    //   summary: title,
    //   detail: content
    // })
  }

  warn(title: string, content: string){
    // this.messageService.add({
    //   severity: 'warn',
    //   summary: title,
    //   detail: content
    // })
  }

  error(title: string, content: string){
    // this.messageService.add({
    //   severity: 'error',
    //   summary: title,
    //   detail: content
    // })
  }
}