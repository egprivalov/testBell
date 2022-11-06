import {Component, OnDestroy} from '@angular/core';
import {ApiImageService} from "../apiimage.service";
import {IBreed} from "../../models/Breed.Interface";
import {Store} from "@ngrx/store";
import {setLoaded, setLoading} from "../../store/store.actions";
import {IState} from "../../models/State.Interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.component.html',
  styleUrls: ['./catlist.component.scss']
})
export class CatlistComponent implements OnDestroy {
  catList: IBreed[] = [];
  loading: boolean = true;
  page: number = 0;
  amountOnPage: number = 10;
  subscribtions: Subscription[] = [];

  constructor(private apiImageService: ApiImageService,
              private store: Store<IState>) {
    this.subscribtions.push(
      this.store.select('loading')
      .subscribe( (value:any) => {this.loading = value.loading})
    )
    this.store.dispatch(setLoading())

    this.subscribtions.push(
    this.store.select('page')
      .subscribe(({page, onPage}:any) => {
        this.page = page;
        this.amountOnPage = onPage;
      })
    )

    this.subscribtions.push(
    this.apiImageService.breeds.subscribe(value => {
      if (value.length !== 0){
        this.store.dispatch(setLoaded())
      }
      this.catList = value;
      })
    )
  }

  ngOnDestroy() {
    this.subscribtions.forEach(subscribtion => {subscribtion.unsubscribe()})
  }
}
