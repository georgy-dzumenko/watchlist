const BASE_URL = "https://api.themoviedb.org/3/";
const api_key = "a1cacae9e097c731c0046cf30fa3b749";

export const getMoviesByYear = (year) => fetch(`${BASE_URL}discover/movie?year=${year}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getCredits = (id) => fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.cast)

export const getCrew = (id) => fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.crew)

export const getPersonsCredits = (id) => fetch(`https://api.themoviedb.org/3/person/${id}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data)

export const getPerson = (id) => fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`)
    .then(response => response.json())

export const getMoviesByTitle = (title) => fetch(`${BASE_URL}search/movie?query=${title}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getMoviesById = (id) => fetch(`${BASE_URL}movie/${id}?api_key=${api_key}`)
    .then(response => response.json())

export const getGenres = () => fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
    .then(response => response.json())

export const getSimilar = (id) => fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getCollection = (id) => fetch(`${BASE_URL}collection/${id}?api_key=${api_key}`)
    .then(response => response.json())

export const getMovieImg = (img, w500 = false) => `https://image.tmdb.org/t/p/${w500 ? "w500" : 'original'}/${img}`

export const getPersonImg = (img, w500 = false) => `https://image.tmdb.org/t/p/${w500 ? "w500" : 'original'}/${img}`
