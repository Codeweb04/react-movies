import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/home.css'
import '../App.css'


require('dotenv').config();



function Home() {

  const history = useHistory()

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [genre, setGenre] = useState([])
  const [genreItem, setGenreItem] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
        .then(res => setMovies(res.data.results))
        // .then( movies.map(movie => setGenreItem([...movie.genre_ids])))
        .catch(err => console.log(err))
    }
    fetch()

    const genreFetch = async () => {
      await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    genreFetch()
  }, [page])

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
    .then(res => setMovies(res.data.results)) 
    .catch(err => console.log(err))
  }

  const getMovies = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
        .then(res => setMovies(res.data.results))
        .catch(err => console.log(err))
  }

  return (
    <div className="Home">
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='search a movie' className='search-bar' onChange={(e) => setSearch(e.target.value)}/>
        <input type='submit' value='Search' className='btn'/>
      </form>
        
      <ul className='movies-list-container'>
                {
                    movies.map(movie => <li className='movies-list-item' key={movie.id} onClick= {() => {
                      history.push({
                        pathname: `/movie-details/${movie.id}`
                      })
                    }}>
                      <img className='movie-image' src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title}/>
                      {movie.original_title}
                      {genreItem}
                      
                   </li>)
                }
      </ul>
      <div className='nav-btn-container'>
      {page>1 ? <button className='btn' value='Previous' onClick={() => {
        setPage(page - 1)
        getMovies()
        }}>Previous Page</button>: ''}

        <button className='btn' value='Next' onClick={() => {
          setPage(page + 1)
          getMovies()
        }}>Next</button>
      </div>
    </div>
  );
}

export default Home;
