import React from 'react'
import { useState, useEffect, useContext } from 'react'
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import { TokenContext } from '../App';

const Movie = () => {

    const { isAdmin } = useContext(TokenContext)

    const [movies, setMovies] = useState([]);

    const fetchData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/movies/getMovies`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setMovies(data.movies);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
      {isAdmin ?
        <AdminView fetchData={fetchData} movies={movies}/>
      :
        <UserView fetchData={fetchData} movies={movies}/>
      }
    </>
  )
}

export default Movie
