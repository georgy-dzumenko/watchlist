const BASE_URL = "https://api.themoviedb.org/3/";
const api_key = "a1cacae9e097c731c0046cf30fa3b749";

export const getMoviesByYear = async (year, type = "movie") => {
    if(type == "multi") {
        return fetch(`${BASE_URL}discover/movie?year=${year}&api_key=${api_key}`)
            .then(response => response.json())
            .then(data => data.results.map((el) => ({...el, media_type: "movie"})))
            .then((result) => getMoviesByYear("2021", 'tv').then((tvResult) => [...result, ...tvResult.map((el) => ({...el, media_type: "tv", title: el.name}))]))
    }

    return fetch(`${BASE_URL}discover/${type}?year=${year}&api_key=${api_key}`)
        .then(response => response.json())
        .then(data => data.results.map((el) => ({...el, media_type: type, title: el.name || el.title})))
}

export const getCredits = (id, movieType) => fetch(`${BASE_URL}${movieType}/${id}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.cast)

export const getTrailer = (id, movieType) => fetch(`${BASE_URL}${movieType}/${id}/videos?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getCrew = (id, movieType) => fetch(`${BASE_URL}${movieType}/${id}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.crew)

export const getPersonsCredits = (id) => fetch(`${BASE_URL}person/${id}/combined_credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data)

export const getPerson = (id) => fetch(`${BASE_URL}person/${id}?api_key=${api_key}`)
    .then(response => response.json())

export const getMoviesByTitle = (title) => fetch(`${BASE_URL}search/multi?query=${title}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results)

export const getMoviesById = (id, movieType) => fetch(`${BASE_URL}${movieType}/${id}?api_key=${api_key}`)
    .then(response => response.json())
    .then(response => ({...response, media_type: movieType, title: response.title || response.name}))

export const getGenres = () => fetch(`${BASE_URL}genre/movie/list?api_key=${api_key}`)
    .then(response => response.json())
    .then(response => response.genres)

export const getSimilar = (id, movieType) => fetch(`${BASE_URL}${movieType}/${id}/similar?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results.map((el) => ({...el, media_type: movieType, title: el.title || el.name})))

export const getCollection = (id) => fetch(`${BASE_URL}collection/${id}?api_key=${api_key}`)
    .then(response => response.json())

export const getMovieImg = (img, w500 = false) => `https://image.tmdb.org/t/p/${w500 ? "w500" : 'original'}/${img}`

export const getPersonImg = (img, w500 = false) => `https://image.tmdb.org/t/p/${w500 ? "w500" : 'original'}/${img}`
