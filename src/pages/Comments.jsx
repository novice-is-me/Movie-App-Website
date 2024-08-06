import { Button, Form, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Comments = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const { movie } = location.state || {};

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  console.log(movie._id); 

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/getComments/${movie._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.comments)) {
          
          const uniqueComments = data.comments.reduce((acc, comment) => {
            if (!acc.find(c => c._id === comment._id)) {
              acc.push(comment);
            }
            return acc;
          }, []);
          setComments(uniqueComments);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments.');
      });
  }, [movieId]);
  

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_API_URL}/movies/addComment/${movie._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.updatedMovie) {
          
          const uniqueComments = data.updatedMovie.comments.reduce((acc, comment) => {
            if (!acc.find(c => c._id === comment._id)) {
              acc.push(comment);
            }
            return acc;
          }, []);
          setComments(uniqueComments);
          setNewComment('');
          Swal.fire({
            title: 'Success',
            text: 'Comment added successfully',
            icon: 'success',
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to add comment',
            icon: 'error',
          })
        }
      })
      .catch(err => {
        setError('Failed to add comment.');
        setSuccess('');
        console.error('Error adding comment:', err);
      });
  };
  

  return (
    <div className='p-5 border my-5'>
        <Link className=' btn btn-danger' to='/movies'>Back</Link>
      <h1 className='text-center my-2'>Comments on Movie: {movie?.title}</h1>
      <p><strong>Title:</strong> {movie?.title}</p>
      <p><strong>Description:</strong> {movie?.description}</p>
      <p><strong>Director:</strong> {movie?.director}</p>
      <p><strong>Genre:</strong> {movie?.genre}</p>
      <p><strong>Year:</strong> {movie?.year}</p>
      <h2>Comments:</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>{comment.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments available</p>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label className=''>Add a Comment</Form.Label>
          <Form.Control
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
          />
        </Form.Group>
        <Button variant='info' type='submit' className=' my-3'>Add Comment</Button>
        {success && <Alert variant='success'>{success}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
      </Form>
    </div>
  );
};

export default Comments;
