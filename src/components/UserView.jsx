import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserView = ({ movies }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <h1 className='text-center my-4'>Available Movies</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Description</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Year</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.director}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td className=' d-flex justify-content-center'>
                <Button onClick={() => handleShow(movie)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedMovie && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Title:</strong> {selectedMovie.title}</p>
            <p><strong>Description:</strong> {selectedMovie.description}</p>
            <p><strong>Director:</strong> {selectedMovie.director}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close 
            </Button>
            <Button variant='primary' as={Link}  to='/comments' state={{ movie: selectedMovie }}>View Comments</Button>
          </Modal.Footer> 
        </Modal>
      )}
    </>
  );
};

export default UserView;
 