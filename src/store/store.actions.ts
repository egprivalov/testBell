import {createAction, props} from "@ngrx/store";
import {IBreed} from "../models/Breed.Interface";

// CatList component
export const setLoading = createAction('[CatList Component] SetLoading')
export const setLoaded = createAction('[CatList Component] SetLoaded')

// CatCard component
export const addFavourite = createAction('[CatCard Component] AddFavourite', props<{ breed: IBreed }>())
export const deleteFavourite = createAction('[CatCard Component] DeleteFavourite', props<{ breed: IBreed }>())

// FilterBar component
export const setPage = createAction('[FilterBar Component] SetPage', props<{page: number}>())
export const setOnPage = createAction('[FilterBar Component] SetOnPage', props<{onPage: number}>())

