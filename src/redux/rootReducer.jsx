import { combineReducers } from "redux";
import { genresReducer } from "./genresReducer";

export const rootReducer = combineReducers({
  genres: genresReducer,
})