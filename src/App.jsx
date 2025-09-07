import './css/App.css'
import MovieCard from './components/MovieCard';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
    <MovieProvider>
      <NavBar></NavBar>
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </main>
    </MovieProvider>
  )
} 

function Text({display}){ // display here is a prop
  return <div>
    <p>{display}</p>
  </div>
}

export default App