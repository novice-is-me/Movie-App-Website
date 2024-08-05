import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import EditMovie from './EditMovie'
import DeleteMovie from './DeleteMovie'

const AdminView = ({fetchData, movies}) => {
  return (
    <>
      <h1 className='text-center my-4'>Available Movies</h1>
      <div className=' d-flex justify-content-center my-4'>
        <Link className=' btn btn-danger' to='/addMovie'>Add Movie</Link>
      </div>
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
                            {/* make the comments a modal */}
                            {/* <td>{movie.comments}</td>  */}
                            <td className="text-center d-flex gap-2">
                                {/* Edit, and Delete */}
                                <EditMovie movie={movie} fetchData={fetchData} />
                                <DeleteMovie movieId={movie._id} fetchData={fetchData} />
                            </td>
                        </tr>
                    ))} 
                </tbody>
        </Table>
    </>
  )
}

export default AdminView
