import { axios } from 'hooks/worker'
import { SetterOrUpdater } from 'recoil'
import { IMovieAPIResult, IMovieArr } from 'types/search.d'
// import dotenv from 'dotenv'

const MOVIE_BASE_URL = `http://www.omdbapi.com`

interface MovieParams {
  s: string
  page: number
}

const getMovieApi = (params: MovieParams) =>
  axios.get<IMovieAPIResult>(MOVIE_BASE_URL, {
    params: {
      apiKey: process.env.REACT_APP_MOVIE_APP_KEY,
      ...params,
    },
  })

interface ListParams {
  s: string
  page: number
  updater: SetterOrUpdater<Array<IMovieArr> | []>
}

export const getMovieList = (params: ListParams) => {
  getMovieApi({ s: params.s, page: params.page }).then((res) => {
    if (res.data.Response === 'False') params.updater([])
    else params.updater([...res.data.Search])
  })
}
