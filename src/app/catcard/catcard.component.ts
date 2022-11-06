import {Component, Input, OnInit} from '@angular/core';
import {IBreed} from "../../models/Breed.Interface";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IState} from "../../models/State.Interface";
import {addFavourite, deleteFavourite, setLoaded} from "../../store/store.actions";

@Component({
  selector: 'app-catcard',
  templateUrl: './catcard.component.html',
  styleUrls: ['./catcard.component.scss']
})
export class CatcardComponent implements OnInit{
  @Input() cat!: IBreed;
  isDescriptionHidden = true;
  isFavorite = false;
  favourites$ = new Observable<Set<string>>();

  constructor(
    private readonly store: Store<IState>
  ) { }

  ngOnInit() {
    this.favourites$ = this.store.select('favourite');
    this.favourites$.subscribe((fav: any) => {
      this.isFavorite = !!fav.favourite.has(this.cat.id);
    })
  }

  setFavorite() {
    if (this.isFavorite) {
      this.store.dispatch(deleteFavourite({breed: this.cat}))
      this.store.dispatch(setLoaded())
    }
    else{
      this.store.dispatch(addFavourite({breed: this.cat}))
    }
  }
}
