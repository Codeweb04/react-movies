import { ADD_FAV, REMOVE_FAV } from "./movieActions";
let favoriteMovies;
function addToFavorite(state = [], action) {
  switch (action.type) {
    case ADD_FAV:
      favoriteMovies = [...state, action.movieId];
      return favoriteMovies;
    case REMOVE_FAV: 
      favoriteMovies = state.filter((item) => item !== action.movieId);
      return favoriteMovies;
    default:
      return state;
  }
}

export default addToFavorite;