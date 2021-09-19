import { getGenres } from "../components/api";

const initialState = {
  genres: []
}


export const genresReducer = async (state = initialState) => {
  await getGenres((response) => initialState.genres = response);
  return state;
}
