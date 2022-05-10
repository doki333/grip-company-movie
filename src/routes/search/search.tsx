import { useMount, useRef } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieInfo, SearchState } from 'hooks/state/atom'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { getMovieList } from 'services/movie'
import { MovieList } from './movieList'
import styles from './search.module.scss'

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [, setMovieList] = useRecoil(movieInfo)

  const [text, setText] = useState<string>('')

  useMount(() => {
    getMovieList({ s: text, page: 1, updater: setMovieList })
    if (inputRef.current) inputRef.current.focus()
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
    getMovieList({ s: text, page: 1, updater: setMovieList })
  }

  return (
    <div className={styles.searchWrapper}>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInputChange} ref={inputRef} />
        <button type='submit'>Search</button>
      </form>
      <MovieList />
    </div>
  )
}
