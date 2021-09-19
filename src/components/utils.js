export const movieTypeByHomepage = (homepage = '') => {
  if(homepage.includes('/movies/')) {
    return 'movie'
  }

  if(homepage.includes('/tv/')) {
    return 'tv'
  }
}