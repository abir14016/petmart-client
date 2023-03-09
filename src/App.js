import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
// import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import backgroundImage from "./assets/background/scattered-forcefields.svg";
import Posts from './Pages/Posts/Posts';
import Login from './Pages/Authentication/Login/Login';
import Regester from './Pages/Authentication/Regester/Regester';

function App() {
  const background = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };
  return (
    <div className="App" style={background}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/regester' element={<Regester />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
      {/* <Footer /> */}
    </div>

  );
}

export default App;
