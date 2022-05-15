import { atom } from 'recoil'
import { IMovieItem, IPageResult } from 'types/search'

export const searchedTxtState = atom<string>({
  key: '#searchedText',
  default: '',
})

export const pageCountState = atom<IPageResult>({
  key: '#pageSetting',
  default: {
    page: 1,
    wholePage: 0,
  },
})

export const modalVisibleState = atom<Boolean>({
  key: '#modalState',
  default: false,
})

export const infoOnModalState = atom({
  // 모달창에서 추가할 아이템
  key: '#selectedInfoOnModal',
  default: {} as IMovieItem,
})

export const movieApiInfo = atom<Array<IMovieItem> | []>({
  // API로 불러온 아이템 배열
  key: '#wholeMovieInfoArray',
  default: [],
})

export const isLoading = atom<Boolean>({
  key: '#isLoadingNow',
  default: false,
})

export const isItemDraggable = atom<Boolean>({
  key: '#isDraggableListNow',
  default: false,
})

export const favoriteMovieList = atom<Array<IMovieItem> | []>({
  key: '#favoriteMovieArray',
  default: [],
})
