import { IMovieItem } from './search.d'

export interface mappingData {
  data: IMovieItem[] | []
  scrollEvent?: React.UIEventHandler<HTMLUListElement>
  keyword: string
  isEmpty: Boolean
  emptyText: string
  msgRef?: React.LegacyRef<HTMLParagraphElement>
}
