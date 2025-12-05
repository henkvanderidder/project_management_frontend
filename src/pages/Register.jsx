import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../axios';

function Register() {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");  
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        //console.log("Register submitted:", { name, email, password });

        try {
            const response = await api.post('/register', {
                name,
                email,
                password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            // console.log("Register successful:", response.data);
            setMessage(response.data.message);
            navigate('/login');

        } catch (error) {
            console.error("Register failed:", error);
            if (error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An error occurred during register.");
            }
        } finally {
            setLoading(false);
        }
    };

   // zie https://prebuiltui.com/components/login-form#modern-sign-up-form-61be
   return (
     <div className="flex justify-center items-center h-screen">
        <form 
          className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
          onSubmit={handleSubmit}>          
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      
          <input 
                    className="w-full outline-none bg-transparent py-2.5" 
                    type="string" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Email" 
                    required />          
          <input 
                    className="w-full outline-none bg-transparent py-2.5" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required />          
          <input 
                    className="w-full outline-none bg-transparent py-2.5" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required />

          <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium">
            {loading ? "Registering..." : "Register"}
          </button>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}

          <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link></p>
      </form>
     </div>
   );
 }

export default Register;