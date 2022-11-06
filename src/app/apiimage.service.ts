import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IBreed} from "../models/Breed.Interface";
import {Store} from "@ngrx/store";
import {IState} from "../models/State.Interface";
import {setPage} from "../store/store.actions";

@Injectable({
  providedIn: 'root'
})
export class ApiImageService {
  api_url = "https://api.thecatapi.com/v1/";
  breeds_url = "breeds"
  api_key = "live_7uqlpmPF9WcfPfjLCv2mQrje5xjDpByRuUHCQKmDZxDvbDAaOx2mToWraqrbhtaq"
  breeds: BehaviorSubject<IBreed[]> = new BehaviorSubject<IBreed[]>([]);
  allBreeds: IBreed[] = []

  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': this.api_key,
  })

  constructor( private http: HttpClient,
               private store: Store<IState>) {
    this.getBreeds()
  }

  getBreeds() {
    this.http.get(this.api_url+this.breeds_url, {headers: this.reqHeaders})
      .subscribe(
        (breedlist: any) => {
          let newBreedList: IBreed[] = []
          for (let breed of breedlist){
            console.log(breed.id)
            let newBreed: IBreed = {
              id: breed.id,
              name: breed.name,
              description: breed.description,
              temperament: breed.temperament,
              image: breed.image?.url
            }
            if (newBreed.id === 'ebur') {
              newBreed.image = "https://cdn2.thecatapi.com/images/d8sbdRtLJ.jpg"
            }
            if (newBreed.id === 'mala') {
              newBreed.image = "https://upload.wikimedia.org/wikipedia/commons/8/89/Shimatora_Smith_3.JPG"
            }
            newBreedList.push(newBreed)
          }
          this.allBreeds = newBreedList;
          this.breeds.next(newBreedList);
        }
      )
  }

  getFavouriteBreeds() {
    this.store.dispatch(setPage({page: 1}))
    let subscribe = this.store.select('favourite').
    subscribe(({favourite}:any) => {
      let nextBreedsValue: IBreed[] = []
      for (let breed of this.breeds.getValue()){
        if (favourite.has(breed.id)){
          nextBreedsValue.push(breed)
        }
      }
      this.breeds.next(nextBreedsValue)
    })
    subscribe.unsubscribe()
  }

  restoreBreeds() {
    this.store.dispatch(setPage({page: 1}))
    this.breeds.next(this.allBreeds)
  }

  findName(name: string) {
    let newBreeds: IBreed[] = []
    for (let breed of this.allBreeds){
      if (breed.name.toLowerCase().includes(name.toLowerCase())){
        newBreeds.push(breed)
      }
    }
    this.breeds.next(newBreeds)
  }
}
