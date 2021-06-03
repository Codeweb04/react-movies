export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";

export const addFav = (movie) => {
  return {
    type: ADD_FAV,
    movie,
  };
}

export const removeFav = (movie) => {
  return {
    type: REMOVE_FAV,
    movie,
  };
}