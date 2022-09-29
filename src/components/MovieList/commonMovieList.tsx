import { IMovieArr } from 'types/search'
import MovieItem from 'components/MovieItem/MovieItem'
import styles from './commonMovieList.module.scss'

interface ICommonMovieList {
  listThing: IMovieArr[] | undefined
}

const CommonMovieList = ({ listThing }: ICommonMovieList) => {
  return (
    <ul className={styles.movieBlockWrapper}>
      {listThing &&
        listThing.map((item) => (
          <MovieItem
            key={`movieItem-${item.imdbID}`}
            title={item.Title}
            year={item.Year}
            type={item.Type}
            imdbID={item.imdbID}
            poster={item.Poster}
          />
        ))}
    </ul>
  )
}

export default CommonMovieList
