import React from 'react'
import { LayOut } from 'components/LayOut'
import { useCallback, useMount, useRef, useUnmount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { isItemDraggable, isLoading, movieApiInfo, pageCountState, searchedTxtState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'
import { SearchInput } from './SearchInput'
import { CommonMovieList } from '../../components/MovieList/commonMovieList'
import { Spinner } from 'components/Spinner/Spinner'

let timer: NodeJS.Timeout

export const Search = () => {
  const msgRef = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [movieList, setMovieList, resetMovieList] = useRecoil(movieApiInfo)
  const [, setIsDragPossible] = useRecoil(isItemDraggable)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageCountState)
  const [isLoad, setIsLoad] = useRecoil(isLoading)
  const [searchedText] = useRecoil(searchedTxtState)

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
        if (isLoad === true) return // 로딩중이면 리턴
        setIsLoad(true)
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          getMovieList({ s: searchedText, page: pageNumber.page + 1, updater: setMovieList, counter: setPageNumber }) // 다음 페이지 데이터 불러오기
          setIsLoad(false)
        }, 150)
      }
    },
    [pageNumber, searchedText, setMovieList, setPageNumber, setIsLoad, isLoad]
  )

  return (
    <LayOut title='search'>
      {isLoad && <Spinner />}
      <SearchInput ref={inputRef} />
      <CommonMovieList
        data={movieList}
        keyword='movie'
        scrollEvent={handleScrollEvent}
        emptyText={emptyEmg}
        msgRef={msgRef}
      />
    </LayOut>
  )
}
