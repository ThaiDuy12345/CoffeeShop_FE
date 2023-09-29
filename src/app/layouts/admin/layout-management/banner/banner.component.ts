import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  onMainBannerInputChange(files: FileList | null): void {
    if(!files) return
    console.log(files)
  }

  onPopUpBannerInputChange(files: FileList | null): void {
    if(!files) return
    console.log(files)
  }
}
