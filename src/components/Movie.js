import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import { addToFav } from '../redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../styles/movie.css'

function Movie(props) {

    const history = useHistory()
    
    const [movie, setMovie] = useState([])
    const [fav, setFav] = useState(false)
    const [recommended, setRecommended] = useState([])

    const path = props.location.pathname.split('/')
    const movieId = path[path.length - 1]

    useEffect(() => {
        const fetch = async () => {
          await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
        }
        fetch()

        const fetchRecommended = async () => {
          await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            .then(res => setRecommended(res.data.results))
            .catch(err => console.log(err))
        }
        fetchRecommended()
      }, [movieId])

      const favAdd = () => {
        props.addToFav(movieId)
      }
      let genres = []
      const buttonText = fav ? 'Remove from Favourites' : 'Add to favourites' 
      for (let i = 0; i < movie.genres; i++) {
        const element = movie.genres[i];
        genres.push(element)
        genres.push(',')
      }
    return (
        <div className='movie-page-container'>
          <div className='movie-container'>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title}/> 
            <h3>Movie Title: {movie.original_title}</h3>
            
            <h3>Language: {movie.original_language}</h3>
            <h3>Number Of Votes: {movie.vote_count}</h3>
            <h3>Genres: {genres}</h3>
            <h3>{props.favMovies}</h3>
            <button className='btn fav-btn' onClick={favAdd}>{buttonText}</button>
          </div>
            <h3>Recommendations:</h3>
            <ul className='movies-list-container'>
            {recommended.map(recommendation => <li className='movies-list-item' key={recommendation.id}
              onClick= {() => {
                history.push({
                  pathname: `/movie-details/${recommendation.id}`
                })
              }}>{recommendation.original_title}<img className='movie-image' src={`https://image.tmdb.org/t/p/w500/${recommendation.backdrop_path}`} alt={recommendation.original_title}/></li>)}
            </ul> 
        </div>
    )
}

const mapStateToProps = state => {
  return {
    favMovies: state.favMovies
  }
}  

const mapDispatchToProps = dispatch => {
  return {
    addToFav: (movieId) => dispatch(addToFav(movieId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Movie)
