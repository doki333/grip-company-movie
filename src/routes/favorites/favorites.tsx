import store from 'storejs'
import { LayOut } from 'components/LayOut'
import { CommonMovieList } from 'components/MovieList/commonMovieList'

export const Favorites = () => {
  const getStoredData = store.get('#M@VIeFavorITe')
  const isEmpty = !getStoredData || getStoredData.length === 0
  const emptyText = '즐겨찾기 항목이 없습니다.'

  return (
    <LayOut title='내 즐겨찾기'>
      <CommonMovieList data={getStoredData} keyword='favorite' isEmpty={isEmpty} emptyText={emptyText} />
    </LayOut>
  )
}
