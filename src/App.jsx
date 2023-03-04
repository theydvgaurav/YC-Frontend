import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactList from './components/ContactList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact-list' element={<ContactList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
