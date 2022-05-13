import React, { Suspense } from 'react'
import { LayOut } from 'components/LayOut'
import { useCallback, useMount, useRef, useUnmount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { isDraggable, isLoading, movieInfo, pageNumberState, searchedState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'
import { SearchInput } from './SearchInput'
import { CommonMovieList } from '../../components/MovieList/commonMovieList'
import styles from 'styles'
import { Spinner } from 'components/Spinner/Spinner'
// import { CommonMovieList } from '../../components/MovieList/commonMovieList'

let timer: NodeJS.Timeout

// const LazyList = React.lazy(async ()=> {
//  await import('../../components/MovieList/commonMovieList')
//  return {default: props => <CommonMovieList {...props} />}
// })

export const Search = () => {
  const msgRef = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [movieList, setMovieList, resetMovieList] = useRecoil(movieInfo)
  const [isDragPossible, setIsDragPossible] = useRecoil(isDraggable)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageNumberState)
  const [isLoad, setIsLoad] = useRecoil(isLoading)
  const [searchedText] = useRecoil(searchedState)

  const isEmpty = movieList.length === 0
  const emptyEmg = '검색 결과가 없습니다.'

  useMount(() => {
    setMovieList([])
    setIsDragPossible(false)
    if (inputRef.current) inputRef.current.focus()
  })

  useUnmount(() => {
    resetPageNumber()
    resetMovieList()
    setIsLoad(false)
    setIsDragPossible((prev) => !prev)
  })

  const handleScrollEvent = useCallback(
    (e: React.UIEvent<HTMLUListElement>) => {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
      const isAtEnd = scrollHeight <= Math.ceil(scrollTop + clientHeight)

      if (pageNumber.page >= pageNumber.wholePage && msgRef.current) {
        // 페이지가 끝으로 가면 다 됐다는 메세지 보여주고 리턴
        msgRef.current.style.display = 'block'
        return
      }

      if (isAtEnd) {
        setIsLoad(true)
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          getMovieList({ s: searchedText, page: pageNumber.page + 1, updater: setMovieList, counter: setPageNumber }) // 다음 페이지 데이터 불러오기
          setIsLoad(false)
        }, 200)
      }
    },
    [pageNumber, searchedText, setMovieList, setPageNumber, setIsLoad]
  )

  return (
    <LayOut title='search'>
      {isLoad && <Spinner />}
      <SearchInput ref={inputRef} />
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
