import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function Layout() {
  const location = useLocation();
  
  // Show Navbar only on specific routes
  const showNavbar = ['/', '/login', '/register'].includes(location.pathname);
  
  return (
    <>
      {showNavbar && <Navbar /> }
      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}  
         <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  );

}
function App() {    

  return (
    <>
    <Router>
      <Layout />  
    </Router>
    </>
  );
}

export default App;
