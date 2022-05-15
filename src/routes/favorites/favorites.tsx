import store from 'storejs'
import { LayOut } from 'components/LayOut'
import { CommonMovieList } from 'components/MovieList/commonMovieList'
import { useMount, useUnmount } from 'react-use'
import { useRecoil } from 'hooks/state'
import { favoriteMovieList, isItemDraggable } from 'hooks/state/movie.atom'

export const Favorites = () => {
  const [, setIsDragPossible] = useRecoil(isItemDraggable)
  const [bookmark, setBookmark] = useRecoil(favoriteMovieList)

  const getStoredData = store.get('#M@VIeFavorITe') || []
  const emptyText = '즐겨찾기 항목이 없습니다.'

  useMount(() => {
    setIsDragPossible(true)
    setBookmark(getStoredData)
  })

  useUnmount(() => {
    setIsDragPossible((prev) => !prev)
  })

  return (
    <LayOut title='내 즐겨찾기'>
      <CommonMovieList data={bookmark} keyword='favorite' emptyText={emptyText} />
    </LayOut>
  )
}
