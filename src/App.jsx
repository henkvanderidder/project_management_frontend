import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';  
import AddProject from './pages/AddProject.jsx';
import EditProject from './pages/EditProject.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import Tasks from './pages/Tasks.jsx';
import AddTask from './pages/AddTask.jsx';
import EditTask from './pages/EditTask.jsx';
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
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
        <Route 
          path="/project/add" 
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          } />
        <Route 
          path="/project/edit/:id" 
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          } />
        <Route 
          path="/project-details/:id" 
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          } />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } />
          <Route 
          path="/task/add" 
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          } />
          <Route 
          path="/task/edit/:id" 
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          } />
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={true} 
      />
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
