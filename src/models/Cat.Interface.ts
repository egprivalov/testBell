import {IBreed} from "./Breed.Interface";

export interface ICat {
  id: string;
  name?: string;
  url: string;
  width: number;
  height: number;
  breed: IBreed;
}
