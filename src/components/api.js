const BASE_URL = "https://api.themoviedb.org/3/";
const api_key = "a1cacae9e097c731c0046cf30fa3b749";

export const getMoviesByYear = async (year, type = "movie") => {
    if(type === "multi") {
        return fetch(`${BASE_URL}discover/movie?year=${year}&api_key=${api_key}`)
            .then(response => response.json())
            .then(data => data.results.map((el) => ({...el, media_type: "movie"})))
            .then((result) => getMoviesByYear("2021", 'tv').then((tvResult) => [...result, ...tvResult.map((el) => ({...el, media_type: "tv", title: el.name}))]))
    }

    return fetch(`${BASE_URL}discover/${type}?year=${year}&api_key=${api_key}`)
        .then(response => response.json())
        .then(data => data.results.map((el) => ({...el, media_type: type, title: el.name || el.title})))
}

export const createToken = () => fetch(`${BASE_URL}/authentication/token/new?api_key=${api_key}`)
    .then(response => response.json())

export const createSessionWithLogin = (username, password, token) => fetch(
        `${BASE_URL}authentication/token/validate_with_login?api_key=${api_key}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body:  JSON.stringify({
                username,
                password,
                request_token: token
            })
        }
    )
    .then((res) => res.json())

export const createSession = (token) => fetch(
    `${BASE_URL}authentication/session/new?api_key=${api_key}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body:  JSON.stringify({
            request_token: token
        })
    }
)
.then((res) => res.json())

export const deleteSession = (session_id) => fetch(
    `${BASE_URL}authentication/session?api_key=${api_key}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'DELETE',
        body:  JSON.stringify({
            session_id
        })
    }
)

export const addToWatchlist = ({session_id, account_id, media_type, media_id, watchlist}) => {
    return fetch(
    `${BASE_URL}account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,
    {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        method: 'POST',
        body:  JSON.stringify({
            media_type,
            media_id,
            watchlist,
        })
    })
}

export const markAsFavorite = ({session_id, account_id, media_type, media_id, favorite}) => {
    return fetch(
    `${BASE_URL}account/${account_id}/favorite?api_key=${api_key}&session_id=${session_id}`,
    {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        method: 'POST',
        body:  JSON.stringify({
            media_type,
            media_id,
            favorite,
        })
    })
}

export const getWatchlist = ({session_id, account_id, media_type}) => fetch(
    `${BASE_URL}account/${account_id}/watchlist/${media_type === 'movie' ? 'movies' : 'tv'}?api_key=${api_key}&session_id=${session_id}`
)
    .then((res) => res.json())
    .then((res) => res.results.map((movie) => ({...movie, title: movie.title || movie.name})))

export const getFavorites = ({session_id, account_id, media_type}) => fetch(
    `${BASE_URL}account/${account_id}/favorite/${media_type === 'movie' ? 'movies' : 'tv'}?api_key=${api_key}&session_id=${session_id}`
)
    .then((res) => res.json())
    .then((res) => res.results.map((movie) => ({...movie, title: movie.title || movie.name})))

export const getAccInfo = (sid) => fetch(`${BASE_URL}account?api_key=${api_key}&session_id=${sid}`)
    .then(response => response.json())

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

export const getPeopleArr = (idArr) => {
    const resultArr = idArr.map(async (id) => {
        const response = await fetch(`${BASE_URL}person/${id}?api_key=${api_key}`)
        const result = response.json();
        return result;
    })

    return resultArr;
}

export const getReviews = (id, mediaType) => fetch(`${BASE_URL}${mediaType}/${id}/reviews?api_key=${api_key}`)
    .then(response => response.json())
    .then(({results}) => results)

export const findPerson = (query) => fetch(`${BASE_URL}search/person?api_key=${api_key}&query=${query}`)
    .then(response => response.json())
    .then(({results}) => results)

export const getMoviesByTitle = (title, mediaType = 'multi') => fetch(`${BASE_URL}search/${mediaType}?query=${title}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => data.results?.map((movie) => ({...movie, title: movie.title || movie.name})))

export const getMoviesById = (id, media_type) => fetch(`${BASE_URL}${media_type}/${id}?api_key=${api_key}`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return ({...response, media_type, title: response.title || response.name})
    })

export const discoverMedia = ({ with_people, media_type = 'tv'}) => {
    return fetch(`${BASE_URL}discover/${media_type}?api_key=${api_key}${with_people ?`&with_people=${with_people}` : ''}`)
    .then(response => response.json())
    .then(response => response.results)
}

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
