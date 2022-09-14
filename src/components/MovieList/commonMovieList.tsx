import { IMovieArr } from 'types/search'
import MovieItem2 from 'components/MovieItem/MovieItem2'
import styles from './movieList2.module.scss'

interface ICommonMovieList {
  listThing: IMovieArr[] | undefined
}

const CommonMovieList = ({ listThing }: ICommonMovieList) => {
  return (
    <ul className={styles.movieBlockWrapper}>
      {listThing &&
        listThing.map((l) => (
          <MovieItem2
            key={`movieItem-${l.imdbID}`}
            title={l.Title}
            year={l.Year}
            type={l.Type}
            imdbID={l.imdbID}
            poster={l.Poster}
          />
        ))}
    </ul>
  )
}

export default CommonMovieList
