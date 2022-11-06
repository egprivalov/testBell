import {createReducer, on} from "@ngrx/store";
import {addFavourite, deleteFavourite, setLoaded, setLoading, setOnPage, setPage} from "./store.actions";
import {IState} from "../models/State.Interface";


export const initialState: IState = {
  loading: false,
  favourite: new Set<string>(),
  onPage: 10,
  page: 1
}


export const favouriteReducer = createReducer(
  {favourite: initialState.favourite},
  on(addFavourite, (state, {breed}) => ({
    ...state,
    favourite: state.favourite.add(breed.id)
  })),
  on(deleteFavourite, (state, {breed})=> ({
    ...state,
    favourite: state.favourite.delete(breed.id) ? state.favourite : new Set()
  }))
)

export const loadingReducer = createReducer(
  {loading: initialState.loading},
  on(setLoading, (state) => ({
    ...state,
    loading: true
  })),
  on(setLoaded, (state) => ({
    ...state,
    loading: false
  })))

export const pageReducer = createReducer(
  {page: initialState.page, onPage: initialState.onPage},
  on(setPage, (state, {page}) =>({
    ...state,
    page: page
  })),
  on(setOnPage, (state, {onPage})=>({
    ...state, onPage: onPage
  })))
