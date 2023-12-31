import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent{
  @Input() classes: string  = ''
  @Input() src: string = ''
  @Input() lazyClasses: string = ''

  public loaded: boolean = false
}
