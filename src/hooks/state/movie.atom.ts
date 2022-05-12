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

export const modalVisibleState = atom<Boolean>({
  key: 'modalState',
  default: false,
})

export const selectedMovieInfo = atom({
  // 모달창에서 추가할 아이템
  key: 'selectedMovieInfo',
  default: {} as IMovieArr,
})

export const movieInfo = atom<Array<IMovieArr> | []>({
  // API로 불러온 아이템 배열
  key: 'movieState',
  default: [],
})

export const isLoading = atom<Boolean>({
  key: 'isLoadingState',
  default: false,
})
