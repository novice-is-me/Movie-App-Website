import React from 'react'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DeleteMovie = ({fetchData, movieId}) => {

    const deleteMovie = () => {
        fetch(`${import.meta.env.VITE_API_URL}/movies/deleteMovie/${movieId}`, {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if (data.message === "Movie deleted successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Movie successfully deleted'
                });
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
            }
        })
        .catch(error => {

            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: 'An unexpected error occurred. Please try again.'
            });
        });
    };

  return (
    <>
       <Button variant="danger" size="sm" onClick={deleteMovie}>
            Delete
        </Button>
    </>
  )
}

export default DeleteMovie
