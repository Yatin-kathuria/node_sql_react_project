import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import Header from './components/header/header';
import ProtectedRoute from './routes/protectedRoute';
import 'bootstrap/dist/css/bootstrap.css';
import SingleUser from './pages/singleUser/singleUser';
import Numbers from './pages/numbers/numbers';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/:id'
            element={
              <ProtectedRoute>
                <SingleUser />
              </ProtectedRoute>
            }
          />
          <Route
            path='/numbers'
            element={
              <ProtectedRoute>
                <Numbers />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
