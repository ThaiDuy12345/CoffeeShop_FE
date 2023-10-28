import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent{
  @Input() classes: string = ''
  @Input() src: string = ''
  @Input() lazyClasses: string = ''

  public loaded: boolean = false
}
