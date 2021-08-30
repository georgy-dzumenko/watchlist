const BASE_URL = "http://api.themoviedb.org/3/"
const api_key = "a1cacae9e097c731c0046cf30fa3b749"

export const getMoviesByYear = (year) => fetch(`${BASE_URL}discover/movie?year=${year}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getMoviesByTitle = (title) => fetch(`${BASE_URL}search/movie?query=${title}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)
