import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Registration from './Components/RegisterUser/Registration';
import UserLogin from './Components/Login/UserLogin';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Registration></Registration>}></Route>
      <Route path='/Login' element={<UserLogin></UserLogin>}></Route>
    </Routes>
    </BrowserRouter>  );
}

export default App;
