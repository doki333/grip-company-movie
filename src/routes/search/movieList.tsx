import { MovieItem } from 'components/MovieItem'
import { useRecoil } from 'hooks/state'
import { movieInfo } from 'hooks/state/atom'
import { IMovieArr } from 'types/search'
import styles from './movieList.module.scss'

export const MovieList = () => {
  const [movieList] = useRecoil(movieInfo)
  // const [movieApi, setMovieApi, resetMovieApi] = useRecoil(getMovieApi)
  // console.log(movies)
  console.log(movieList.length)
  return (
    <div className={styles.movieListWrapper}>
      {movieList.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul>
          {movieList.map((movie: IMovieArr) => (
            <MovieItem {...movie} key={`movie-${movie.imdbID}`} />
          ))}
        </ul>
      )}
    </div>
  )
}
