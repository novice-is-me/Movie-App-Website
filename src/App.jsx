import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Router>
        <Container>
          <Routes>
             <Route path='/' element={<Home/>} />
          </Routes>
        </Container>
    </Router>
    </>
  )
}

export default App
