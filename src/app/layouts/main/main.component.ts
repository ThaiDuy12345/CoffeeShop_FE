import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { OnInit } from '@angular/core'
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  ngOnInit(): void {}
  public show = false
}
