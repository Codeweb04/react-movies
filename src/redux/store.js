import { createStore } from 'redux'
import movieReducer from './movies/movieReducer'

const store = createStore(movieReducer)

export default store