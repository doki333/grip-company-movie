import { axios } from 'hooks/worker'
import { IMovieAPIResult } from 'types/search.d'

const MOVIE_BASE_URL = `http://www.omdbapi.com`

interface MovieParams {
  s: string
  page: number
}

const getMovieList = (params: MovieParams) =>
  axios.get<IMovieAPIResult>(MOVIE_BASE_URL, {
    params: {
      apiKey: process.env.REACT_APP_MOVIE_APP_KEY,
      ...params,
    },
  })

export const handleMovieList = async (params: MovieParams) => {
  const info = await getMovieList({ s: params.s, page: params.page })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw new Error(`에러가 발생했습니다. 새로고침 후 다시 시도해주세요`)
    })

  return {
    movieList: info.Search,
    currentPage: params.page,
    totalPage: Math.ceil(Number(info.totalResults) / 10),
  }
}
