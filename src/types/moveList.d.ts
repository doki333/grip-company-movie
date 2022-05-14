import React from 'react'
import { IMovieItem } from './search.d'

export interface mappingData {
  data: IMovieItem[] | []
  scrollEvent?: React.UIEventHandler<HTMLUListElement>
  keyword: string
  emptyText: string
  msgRef?: React.LegacyRef<HTMLParagraphElement>
}
