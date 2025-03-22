import { useEffect, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import initializer from './cometchatinit/CometChatInitialization';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./protectedroutes/ProtectedRoute";
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

import LoaderExampleText from './components/Loader';



const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const JobApplyForm = lazy(() => import("./pages/JobApplyForm"));
const Jobs = lazy(() => import("./pages/Jobs"));

function App() {
  const {user} = useAuthContext();

  useEffect(() => {
    initializer();
  }, [user]);

  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar />
       
        <Suspense fallback={<LoaderExampleText/>}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/jobapplies" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/addjobs" element={<ProtectedRoute><JobApplyForm /></ProtectedRoute>} />
            <Route path="*" element={"Not Found"} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
