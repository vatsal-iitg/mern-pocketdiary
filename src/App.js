import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert message ="this is an amazing react course"/>
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
    <Routes>
    <Route path="/about" element={<About />} />
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
