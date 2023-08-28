import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { OnInit } from '@angular/core';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    private searchService: NbSearchService,
    private filterStore: FilterStore,
    private location: Location,
    private router: Router
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      if (this.location.path() === '/main/product') {
        this.filterStore.update((state) => {
          return {
            category: state.category,
            search: data.term,
          };
        });
      } else {
        this.filterStore.update(state => {
          return {
            category: [],
            search: data.term,
          }
        });
        this.router.navigate(['/main/product']);
      }
    });
  }
}
