import {Component, OnInit} from '@angular/core';
import {ApiImageService} from "../apiimage.service";
import {IBreed} from "../../models/Breed.Interface";
import {Store} from "@ngrx/store";
import {setLoaded, setLoading} from "../../store/store.actions";
import {IState} from "../../models/State.Interface";

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.component.html',
  styleUrls: ['./catlist.component.scss']
})
export class CatlistComponent implements OnInit {
  catList: IBreed[] = [];
  loading: boolean = true;

  constructor(private apiImageService: ApiImageService,
              private store: Store<IState>) {
    this.store.select('loading').subscribe( (value:any) => {this.loading = value.loading})
    this.store.dispatch(setLoading())
    this.apiImageService.breeds.subscribe(value => {
      if (value.length !== 0){
        this.store.dispatch(setLoaded())
      }
      this.catList = value;
    })

  }

  ngOnInit(): void {
  }

}
