import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import DashBoard from './pages/dashboard/Dashboard';
import WorkArea from './components/WorkArea';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard" element={<DashBoard/>}>
        <Route path="" element={<WorkArea/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
