import { LayOut } from 'components/LayOut'
import { CommonMovieList } from 'components/MovieList/commonMovieList'
import { useCallback, useMount, useRef, useUnmount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieInfo, pageNumberState, searchedState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'
import { SearchInput } from './SearchInput'

let timer: NodeJS.Timeout

export const Search = () => {
  const msgRef = useRef<HTMLParagraphElement>(null)

  const [movieList, setMovieList, resetMovieList] = useRecoil(movieInfo)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageNumberState)
  const [searchedText] = useRecoil(searchedState)

  const isEmpty = movieList.length === 0
  const emptyEmg = '검색 결과가 없습니다.'

  useMount(() => {
    setMovieList([])
  })

  useUnmount(() => {
    resetPageNumber()
    resetMovieList()
  })

  const handleScrollEvent = useCallback(
    (e: React.UIEvent<HTMLUListElement>) => {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
      const isAtEnd = scrollHeight <= Math.ceil(scrollTop + clientHeight)

      if (isAtEnd) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          if (pageNumber.page >= pageNumber.wholePage && msgRef.current) {
            // 페이지가 끝으로 가면 다 됐다는 메세지 보여주고 리턴
            msgRef.current.style.display = 'block'
            return
          }
          getMovieList({ s: searchedText, page: pageNumber.page + 1, updater: setMovieList, counter: setPageNumber }) // 다음 페이지 데이터 불러오기
        }, 150)
      }
    },
    [pageNumber, searchedText, setMovieList, setPageNumber]
  )

  return (
    <LayOut title='search'>
      <SearchInput />
      <CommonMovieList
        data={movieList}
        keyword='movie'
        scrollEvent={handleScrollEvent}
        isEmpty={isEmpty}
        emptyText={emptyEmg}
        msgRef={msgRef}
      />
    </LayOut>
  )
}
