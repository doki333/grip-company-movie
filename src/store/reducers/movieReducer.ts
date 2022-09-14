import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMovieArr } from 'types/search'
import store from 'storejs'

export interface IMovieState {
  value: string
  willStarred: [] | IMovieArr[]
  isVisible: boolean
  favoriteList: [] | IMovieArr[]
}

const getLocalStorageData = store.get('#M@VIeFavorITe') ?? []

const initialState: IMovieState = {
  value: '',
  willStarred: [],
  isVisible: false,
  favoriteList: getLocalStorageData,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload
    },
    setModalInfo: (state, action: PayloadAction<IMovieArr[] | []>) => {
      state.willStarred = [...action.payload]
    },
    setFavorite: (state, action: PayloadAction<IMovieArr[] | []>) => {
      state.favoriteList = [...action.payload]
    },
  },
})

export const { search, toggleModal, setModalInfo, setFavorite } = movieSlice.actions

export default movieSlice.reducer
