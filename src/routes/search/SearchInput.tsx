import React, { useCallback, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useRecoil } from 'hooks/state'
import { movieInfo, pageNumberState, searchedState } from 'hooks/state/movie.atom'
import { useMount } from 'react-use'
import { getMovieList } from 'services/movie'

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [, setMovieList, resetMovieList] = useRecoil(movieInfo)
  const [, setSearchedState] = useRecoil(searchedState)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageNumberState)

  const [text, setText] = useState('')

  useMount(() => {
    if (inputRef.current) inputRef.current.focus()
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input type='text' onChange={handleInputChange} ref={inputRef} />
      <button type='submit'>
        <SearchIcon />
      </button>
    </form>
  )
}
