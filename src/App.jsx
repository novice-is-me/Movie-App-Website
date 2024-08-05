import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movie from './pages/Movie';
import AddMovie from './components/AddMovie';
import Comments from './pages/Comments';
import AppNavbar from './components/AppNavbar';
import { jwtDecode } from 'jwt-decode';
import Logout from './pages/Logout';

export const TokenContext = createContext();

function App() {

  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() =>{
    setToken(localStorage.getItem('token'));
  },[token]);

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      
      isAdmin = decodedToken.role === 'admin'; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } 

  console.log(isAdmin);

  return (
    <>
      <Router>
        <TokenContext.Provider value={{ token, setToken, isAdmin}}>
        <AppNavbar/>
        <Container>
          <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/register' element={<Register/>} />
             <Route path='/login' element={<Login/>}/>
             <Route path='/movies' element={<Movie/>}/>
             <Route path='/addMovie' element={<AddMovie/>}/>
             <Route path='/comments' element={<Comments/>}/>
             <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </Container>
        </TokenContext.Provider>
    </Router>
    </>
  )
}

export default App
