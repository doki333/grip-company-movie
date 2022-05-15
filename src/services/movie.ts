import { axios } from 'hooks/worker'
import { SetterOrUpdater } from 'recoil'
import { IMovieAPIResult, IMovieItem, IPageResult } from 'types/search.d'

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

export interface ListParams {
  s: string
  page: number
  updater: SetterOrUpdater<IMovieItem[] | []>
  counter: SetterOrUpdater<IPageResult>
}

export const getMovieList = (params: ListParams) => {
  let list: IMovieItem[] | []
  getMovieApi({ s: params.s, page: params.page })
    .then(({ data }) => {
      if (data.Response === 'False') {
        list = []
        return
      }
      list = data.Search.map((movie) => {
        return { title: movie.Title, poster: movie.Poster, type: movie.Type, year: movie.Year, imdbID: movie.imdbID }
      })
      params.updater((prev) => [...prev].concat(...list))
      params.counter((prev) => ({ ...prev, page: params.page, wholePage: Math.ceil(Number(data.totalResults) / 10) }))
    })
    .catch(() => {
      throw new Error('에러가 발생했습니다. 다시 시도해주세요')
    })
}
