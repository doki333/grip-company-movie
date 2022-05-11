import { atom } from 'recoil'
import { IMovieArr, IPageResult } from 'types/search'

export const searchedState = atom<string>({
  key: 'searchState',
  default: '',
})

export const pageNumberState = atom<IPageResult>({
  key: 'pageNumber',
  default: {
    page: 1,
    wholePage: 0,
  },
})

export const movieInfo = atom<Array<IMovieArr> | []>({
  key: 'movieState',
  default: [],
})

export const FavoritesState = atom<Array<IMovieArr> | []>({
  key: 'favoriteKeys',
  default: [],
})
