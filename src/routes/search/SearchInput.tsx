import React, { useCallback, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useRecoil } from 'hooks/state'
import { isLoading, movieInfo, pageNumberState, searchedState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'

let timer: NodeJS.Timeout

export const SearchInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const [, setMovieList, resetMovieList] = useRecoil(movieInfo)
  const [, setSearchedState] = useRecoil(searchedState)
  const [pageNumber, setPageNumber, resetPageNumber] = useRecoil(pageNumberState)
  const [, setIsLoad] = useRecoil(isLoading)

  const [text, setText] = useState('')

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget
      setText(value)
    },
    [setText]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') return
    setIsLoad(true)
    resetPageNumber()
    resetMovieList()
    setSearchedState(text)
    timer = setTimeout(() => {
      getMovieList({ s: text, page: pageNumber.page, updater: setMovieList, counter: setPageNumber })
      setIsLoad(false)
      return clearTimeout(timer)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <button type='submit'>
        <SearchIcon />
      </button>
      <input type='text' onChange={handleInputChange} ref={ref} placeholder='Search Movie' />
    </form>
  )
})

SearchInput.displayName = 'SearchInput'
