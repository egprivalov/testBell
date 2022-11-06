import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {FormControl} from "@angular/forms";
import {ApiImageService} from "../apiimage.service";
import {IState} from "../../models/State.Interface";
import {setOnPage} from "../../store/store.actions";

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent {
  isFiltersOpen = false;
  breedName = new FormControl();
  isOnlyFavourite = new FormControl();
  onPage = new FormControl<any>(10);


  constructor(
    private apiImageService: ApiImageService,
    private store: Store<IState>){

    this.isOnlyFavourite.valueChanges.subscribe(value => {
      this.filterByFavourite(value)
    })


    this.breedName.valueChanges.subscribe((value)=>{
      this.apiImageService.findName(value)
      if (this.isOnlyFavourite.value) {
        this.filterByFavourite(false)
      }
    })
  }


  filterByFavourite(isChecked: boolean){
    if (isChecked) {
      this.apiImageService.getFavouriteBreeds()
    }
    else{
      this.apiImageService.restoreBreeds()
      this.apiImageService.findName(this.breedName.value)
    }
  }

  openFilterBar() {
    this.isFiltersOpen = !this.isFiltersOpen
  }

  changeOnPage() {
    this.store.dispatch(setOnPage({onPage: this.onPage.value}))
  }

}
