import store from 'storejs'
import { LayOut } from 'components/LayOut'
import { CommonMovieList } from 'components/MovieList/commonMovieList'
import { useLocation, useMount, useUnmount } from 'react-use'
import { useRecoil } from 'hooks/state'
import { favoriteArr, isDraggable } from 'hooks/state/movie.atom'
import { SortableContainer, SortableItem } from 'components/MovieItem/dragAndDrop'

export const Favorites = () => {
  const [, setIsDragPossible] = useRecoil(isDraggable)
  const [bookmark, setBookmark] = useRecoil(favoriteArr)

  const getStoredData = store.get('#M@VIeFavorITe') || []
  const isEmpty = !getStoredData || getStoredData.length === 0
  const emptyText = '즐겨찾기 항목이 없습니다.'

  useMount(() => {
    setIsDragPossible(true)
    setBookmark(getStoredData)
  })

  useUnmount(() => {
    setIsDragPossible((prev) => !prev)
  })

  console.log('', getStoredData)
  return (
    <LayOut title='내 즐겨찾기'>
      {/* <SortableContainer>
        {bookmark.map((value, index) => (
          <SortableItem key={`favorite-${value.imdbID}`} index={index} />
        ))}
      </SortableContainer> */}
      <CommonMovieList data={bookmark} keyword='favorite' isEmpty={isEmpty} emptyText={emptyText} />
    </LayOut>
  )
}
