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


  ngOnInit(): void {
    this.setEventForSearch()
  }

  constructor(
    private searchService: NbSearchService,
    private filterStore: FilterStore,
    private router: Router
  ){}

  setEventForSearch(): void {
    this.searchService.onSearchSubmit().subscribe(data => {
      this.filterStore._select(state => state.category).subscribe(category => {
        this.filterStore.update({
          category: category,
          search: data.term
        })
        this.router.navigate(['/main/product'])
      })
    })
  }

}
