import { SearchIcon } from 'assets/svgs'
import { useMount, useRef, useUnmount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieInfo, pageNumberState, searchedState } from 'hooks/state/atom'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { getMovieList } from 'services/movie'
import { MovieList } from './movieList'
import styles from './search.module.scss'

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [, setMovieList, resetMovieList] = useRecoil(movieInfo)
  const [, setSearchedState] = useRecoil(searchedState)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageNumberState)

  const [text, setText] = useState<string>('')

  useMount(() => {
    getMovieList({ s: text, page: pageNumber.page, updater: setMovieList, counter: setPageNumber })
    if (inputRef.current) inputRef.current.focus()
  })

  useUnmount(() => {
    resetPageNumber()
    resetMovieList()
  })

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget
      setText(value)
    },
    [setText]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPageNumber()
    resetMovieList()
    setSearchedState(text)
    getMovieList({ s: text, page: pageNumber.page, updater: setMovieList, counter: setPageNumber })
  }

  return (
    <div className={styles.searchWrapper}>
      <h1>Search</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input type='text' onChange={handleInputChange} ref={inputRef} />
        <button type='submit'>
          <SearchIcon />
        </button>
      </form>
      <MovieList />
    </div>
  )
}
