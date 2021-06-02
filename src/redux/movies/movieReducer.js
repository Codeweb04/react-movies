import { FAV_MOVIES } from './movieTypes'

const initialState = {
    favMovies: []
}

const movieReducer = (state = initialState, action, params) => {
    switch(action.type) {
        case FAV_MOVIES: return {
            ...state,
            favMovies:  state.favMovies.push(params)
        }
        default: return state
    }
}

export default movieReducer