import './App.css'
import Landing from './pages/landingPage';
import Admin from './pages/adminPage';
import Login from './pages/login';
import Register from './pages/register';
import {ContextProvider} from './UserContext'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AccountPage  from './pages/accountPage';
import { VisualisationPage } from './pages/visualisationPage';

const url = import.meta.env.VITE_SERVER;
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/insights' element={<VisualisationPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/account/:subpage?' element={<AccountPage/>}/>
        <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
      </Routes>
    </ContextProvider>
  )
}

export default App