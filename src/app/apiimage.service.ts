import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, delay, map, takeLast, takeUntil} from "rxjs";
import {IBreed} from "../models/Breed.Interface";

@Injectable({
  providedIn: 'root'
})
export class ApiImageService {
  api_url = "https://api.thecatapi.com/v1/";
  images_url = "images/search"
  breeds_url = "breeds"
  api_key = "live_7uqlpmPF9WcfPfjLCv2mQrje5xjDpByRuUHCQKmDZxDvbDAaOx2mToWraqrbhtaq"
  breeds: BehaviorSubject<IBreed[]> = new BehaviorSubject<IBreed[]>([]);

  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': this.api_key,
  })

  constructor( private http: HttpClient) {
    this.getBreeds()
  }

  getBreeds() {
    this.http.get(this.api_url+this.breeds_url, {headers: this.reqHeaders})
      // .pipe(delay(3000))
      .subscribe(
        (breedlist: any) => {
          let newBreedList: IBreed[] = []
          for (let breed of breedlist){
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
          this.breeds.next(newBreedList)
        }
      )
  }
}
