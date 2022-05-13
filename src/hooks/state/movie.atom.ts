import { atom } from 'recoil'
import { IMovieArr, IMovieItem, IPageResult } from 'types/search'

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
  default: {} as IMovieItem,
})

export const movieInfo = atom<Array<IMovieItem> | []>({
  // API로 불러온 아이템 배열
  key: 'movieState',
  default: [],
})

export const isLoading = atom<Boolean>({
  key: 'isLoadingState',
  default: false,
})

export const isDraggable = atom<Boolean>({
  key: 'isListDraggableState',
  default: false,
})

// export const favoriteArr = atom<Array<IMovieItem> | []>({
//   key: 'favoriteMovieState',
//   default: [],
// })
