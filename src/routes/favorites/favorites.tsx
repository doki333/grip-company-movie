import store from 'storejs'
import { LayOut } from 'components/LayOut'
import { CommonMovieList } from 'components/MovieList/commonMovieList'
import { useLocation, useMount, useUnmount } from 'react-use'
import { useRecoil } from 'hooks/state'
import { isDraggable } from 'hooks/state/movie.atom'

export const Favorites = () => {
  const [isDragPossible, setIsDragPossible] = useRecoil(isDraggable)

  const getStoredData = store.get('#M@VIeFavorITe')
  const isEmpty = !getStoredData || getStoredData.length === 0
  const emptyText = '즐겨찾기 항목이 없습니다.'

  useMount(() => {
    setIsDragPossible(true)
  })

  useUnmount(() => {
    setIsDragPossible((prev) => !prev)
  })

  console.log('', getStoredData)
  return (
    <LayOut title='내 즐겨찾기'>
      <CommonMovieList data={getStoredData} keyword='favorite' isEmpty={isEmpty} emptyText={emptyText} />
    </LayOut>
  )
}
