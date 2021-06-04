export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";

export const addFav = (movieId) => {
  return {
    type: ADD_FAV,
    movieId,
  };
}

export const removeFav = (movieId) => {
  return {
    type: REMOVE_FAV,
    movieId,
  };
}