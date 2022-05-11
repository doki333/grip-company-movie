import { axios } from 'hooks/worker'
import { SetterOrUpdater } from 'recoil'
import { IMovieAPIResult, IMovieArr, IPageResult } from 'types/search.d'
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
  counter: SetterOrUpdater<IPageResult>
}

export const getMovieList = (params: ListParams) => {
  getMovieApi({ s: params.s, page: params.page }).then(({ data }) => {
    if (data.Response === 'False') params.updater([])
    else {
      params.updater((prev) => [...prev].concat(...data.Search))
      params.counter((prev) => ({ ...prev, page: params.page, wholePage: Math.ceil(Number(data.totalResults) / 10) }))
    }
  })
}
