import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store/store'
import { search } from 'store/reducers/movieReducer'

import { LayOut } from 'components/LayOut/LayOut'
import CommonMovieList from 'components/MovieList/CommonMovieList'
import { Spinner } from 'components/Spinner/Spinner'
import SearchInput from './SearchInput'

import { useEffect, useRef, useUnmount } from 'hooks'
import { handleMovieList } from 'services/movie'

import styles from './search.module.scss'

export const SearchFor = () => {
  const { ref, inView } = useInView()
  const scrollRef = useRef(null)
  const dispatch = useDispatch()

  const qKeyword = useSelector((state: RootState) => state.movie.value)
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [qKeyword, '#movies'],
    ({ pageParam = 1 }) => handleMovieList({ s: qKeyword, page: pageParam }),
    {
      getNextPageParam: (next) => {
        if (next.currentPage > next.totalPage || isNaN(next.totalPage)) return undefined
        return next.currentPage + 1
      },
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
      suspense: true,
      enabled: !!qKeyword,
      initialData: undefined,
    }
  )

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [dispatch, fetchNextPage, inView])

  useUnmount(() => {
    dispatch(search(''))
  })

  return (
    <LayOut title='search'>
      <SearchInput scrollRefer={scrollRef} />
      {!data && <p>검색 결과가 없습니다.</p>}
      {data && (
        <div className={styles.listWrapper} ref={scrollRef}>
          {data.pages.map((d) => (
            <CommonMovieList listThing={d.movieList} key={`lists-${d.currentPage}`} />
          ))}
          {hasNextPage && <Spinner ref={ref} />}
          {!hasNextPage && <p>검색 결과가 없습니다.</p>}
        </div>
      )}
    </LayOut>
  )
}
