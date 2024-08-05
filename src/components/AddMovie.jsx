import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddMovie = () => {
    
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')

    const handleAdd = (e) => {

        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/movies/addMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                director: director,
                genre: genre,
                year: year
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: 'Movie Added',
                    icon: 'success',
                    text: 'Movie has been added successfully.'
                })

                navigate ('/movies')
            }else{
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: 'Something went wrong. Please try again later.'
                })
            }
        })
    }

  return (
    <div className=' p-5'>
      <Link to='/movies' className='btn btn-danger'>Back</Link>
      <h1 className=' text-center'>Adding Movies</h1>
        <Form className=' border p-5' onSubmit={(e) => handleAdd(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Movie Name</Form.Label>
                <Form.Control type="text" 
                    placeholder="Add Workout" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control type='text'
                    placeholder="Duration"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Director</Form.Label>
                <Form.Control type='text'
                    placeholder="Duration"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Genre</Form.Label>
                <Form.Control type='text'
                    placeholder="Duration"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Year</Form.Label>
                <Form.Control type='number'
                    placeholder="Duration"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    />
            </Form.Group>
            <Button type='submit' variant='danger'>Add</Button>
        </Form>
    </div>
  )
}

export default AddMovie
