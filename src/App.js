import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
// import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import backgroundImage from "./assets/background/scattered-forcefields.svg";
import Posts from './Pages/Posts/Posts';
import Login from './Pages/Authentication/Login/Login';
import Regester from './Pages/Authentication/Regester/Regester';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import NotFound from './Pages/Shared/NotFound/NotFound';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import AllOrders from './Pages/Dashboard/AllOrders/AllOrders';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import RequireAuth from './Pages/Authentication/RequireAuth/RequireAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import UseAdmin from './hooks/UseAdmin';
import RequireAdmin from './Pages/Authentication/RequireAdmin/RequireAdmin';

function App() {
  const [user] = useAuthState(auth);
  const [admin] = UseAdmin(user);
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
        <Route path='/posts' element={<RequireAuth><Posts /></RequireAuth>} />
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard />
        </RequireAuth>} />

        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard></Dashboard>
        </RequireAuth>}>
          {
            admin ? <Route index element={<AllUsers></AllUsers>}></Route> : <Route index element={<MyOrders></MyOrders>} />
          }
          <Route path='allorders' element={<RequireAdmin>
            <AllOrders></AllOrders>
          </RequireAdmin>}></Route>
          <Route path='myorders' element={<MyOrders></MyOrders>}></Route>
        </Route>

        <Route path='/*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
      <ToastContainer />
    </div>

  );
}

export default App;
