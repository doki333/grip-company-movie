import { MovieItem } from 'components/MovieItem/MovieItem'
import React from 'react'
import { IMovieArr } from 'types/search'

interface mappingData {
  data: Array<IMovieArr>
  scrollEvent: React.UIEventHandler<HTMLUListElement> | undefined
  child?: JSX.Element | JSX.Element[]
  keyword: string
}

export const commonMovieList = ({ data, scrollEvent, child, keyword }: mappingData) => {
  return (
    <div>
      <ul onScroll={scrollEvent}>
        {data.map((value: IMovieArr) => (
          <MovieItem {...value} key={`${keyword}-${value.imdbID + Math.random()}`} />
        ))}
      </ul>
      {child}
    </div>
  )
}

{
  /* <ul onScroll={handleScrollEvent}>
          {movieList.map((movie: IMovieArr) => (
            <MovieItem {...movie} key={`movie-${movie.imdbID + Math.random()}`} />
          ))}
          <p className={styles.endMsg} ref={msgRef}>
            검색 결과가 더이상 없습니다!
          </p>
        </ul>

<ul className={styles.favoriteItemsWrapper}>
{getStoredData.map((data: IMovieArr) => (
  <MovieItem {...data} key={`favorite-${data.imdbID}`} />
))}
</ul> */
}
