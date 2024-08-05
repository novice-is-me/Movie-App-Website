import React from 'react'
import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'

const EditMovie = ({movie, fetchData}) => {

    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [director, setDirector] = useState(movie.director);
    const [genre, setGenre] = useState(movie.genre);
    const [year, setYear] = useState(movie.year);

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setShowEdit(true); 
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const editMovie = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_URL}/movies/updateMovie/${movie._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                director: director,
                genre: genre,
                year: year
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Movie updated successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Movie Successfully updated'
                });
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
                closeEdit();
            }
        });
    };
  return (
    <>
      <Button variant="primary" size="sm" onClick={openEdit}>Edit</Button>

        <Modal show={showEdit} onHide={closeEdit}>
            <Form onSubmit={editMovie}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={director}
                            onChange={e => setDirector(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                    </Form.Group> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
  )
}

export default EditMovie
