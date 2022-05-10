import axios from 'axios'
import { useAxios } from 'hooks/worker'
import { atom, selector, selectorFamily } from 'recoil'
import { IMovieAPIResult, IMovieArr } from 'types/search'

export const SearchState = atom<string>({
  key: 'searchState',
  default: '',
})

export const pageNumberState = atom<number>({
  key: 'pageNumber',
  default: 1,
})

export const movieInfo = atom<Array<IMovieArr> | []>({
  key: 'movieState',
  default: [],
})

// export const setMovieInfoList = selectorFamily({
//   key: 'movieListKey',
//   get: (data) => async () => {
//     console.log(data)
//   },
// })

// const postList = selectorFamily({
//   key: 'postList',
//   get: (page) => async () => {
//     const posts = await getPostList(page);
//     return posts
//   }
// })

// const movieList = selectorFamily({
//   key: 'movieList',
//   get: (s) => async () => {
//     const movies = await axios(`http://www.omdbapi.com/?apikey=92e32667&s=iron%20man&page=2`)
//   }
// })

// export const FavoritesState = {
//   key: 'favoriteKeys',
//   default: [],
// }

// const getMovieInfo = selector({
//   key: 'movieInfo',
//   get: async () => {
//     const response = await axios('http://www.omdbapi.com/?apikey=92e32667&s=iron%20man&page=2')
//   },
// })
