
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Course from './Course/Course';
import Signup from './components/Signup';
import {Toaster} from "react-hot-toast";
import { useAuth } from './context/AuthProvider';

const App = () => {
  const [authUser,setAuthUser]=useAuth()
  return (
    <>
     <div className="bg-white  dark:bg-slate-900 dark:text-white">
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
            path="/course"
            element={authUser ? <Course /> : <Navigate to="/signup" />}
          />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <Toaster/>
    </Router>
    </div>
    </>
  );
};

export default App;
