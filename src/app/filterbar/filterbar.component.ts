import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent implements OnInit {
  isFiltersOpen = false;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  openFilterBar() {
    this.isFiltersOpen = !this.isFiltersOpen
  }
}
