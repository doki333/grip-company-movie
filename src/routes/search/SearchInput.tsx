import React, { useCallback, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useRecoil } from 'hooks/state'
import { isLoading, movieApiInfo, pageCountState, searchedTxtState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'

let timer: NodeJS.Timeout

export const SearchInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const [, setMovieList, resetMovieList] = useRecoil(movieApiInfo)
  const [, setSearchedState] = useRecoil(searchedTxtState)
  const [, setPageNumber, resetPageNumber] = useRecoil(pageCountState)
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
    getMovieList({ s: text, page: 1, updater: setMovieList, counter: setPageNumber })

    timer = setTimeout(() => {
      setIsLoad(false)
      return clearTimeout(timer)
    }, 1000)
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
