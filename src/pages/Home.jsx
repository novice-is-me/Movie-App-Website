import React from 'react'
import { useContext } from 'react'
import { TokenContext } from '../App'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {

    const { token } = useContext(TokenContext);
  return (
    <div className=' my-5'>
      <h1 className=' text-center'>Welcome to Movie App Website!</h1>
      <div className=' d-flex justify-content-center my-3'>
        {token ? 
            <Button variant='primary' as={Link} to='/movies'>My Workouts</Button>
            : 
            <Button variant='primary' as={Link} to='/login'>Login</Button>
            }
        </div>
    </div> 
  )
}

export default Home
