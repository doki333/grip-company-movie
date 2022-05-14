import React from 'react'

export interface initialState {
  draggedFrom: number
  draggedTo: number
  isDragging: boolean
  updatedOrder: IMovieItem[] | []
}
export interface IMovieItem {
  title: string
  year: string
  imdbID: string
  type: string
  poster: string
}
