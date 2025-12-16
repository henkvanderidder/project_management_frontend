import {useState} from "react";
import api from '../axios';
import { toast } from 'react-toastify';
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {  
        const token = localStorage.getItem("token");

        const response = await api.post("/projects", {  
          name: name,
          description: description,
          due_date : dueDate
        }, {
          headers : { 
            Authorization: `Bearer ${token}`
           },
         });

        console.log("Project add response data", response.data);
        setMessage(response.data.message);
        toast.success(response.data.message || "Project added successful!");

        navigate('/projects');
        
      } catch (error) {
        console.error("Error adding project:", error);
        toast.error("Failed to add project.");
      } finally {
        setLoading(false);
      } 
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Project
          </h2>

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Adding Project..." : "Add Project"}
              </button>
              {message && <p className="text-center mt-4 text-red-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddProject;