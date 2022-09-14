import { FormEvent, ChangeEvent, useCallback } from 'react'
import { SearchIcon } from 'assets/svgs'
import { useState } from 'hooks'

import styles from './searchInput.module.scss'
import { useDispatch } from 'react-redux'
import { search } from 'store/reducers/movieReducer'

interface ISearchInputProps {
  scrollRefer: any
}

const SearchInput = ({ scrollRefer }: ISearchInputProps) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    },
    [setText]
  )

  const handleSumbitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTxt = text.trim()
    if (newTxt === '') return
    dispatch(search(text))
    if (scrollRefer.current !== null) {
      scrollRefer.current.scrollTop = 0
    }
  }

  return (
    <form onSubmit={handleSumbitForm} className={styles.searchForm}>
      <button type='submit'>
        <SearchIcon color='white' />
      </button>
      <input type='text' value={text} onChange={handleChange} placeholder='Search Movie' />
    </form>
  )
}

export default SearchInput
