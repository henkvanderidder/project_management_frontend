import {useEffect, useState} from "react";
//import api from '../axios';
import { toast } from 'react-toastify';
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { getProject, editProject } from '../services/projectService';

function EditProject() {
  const {token} = useAuth();
  const {id} = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();
 
 useEffect(() => {
    const fetchProject = async () => {
      try {  
        /*
        //const token = localStorage.getItem("token");    
        const response = await api.get(`/projects/${id}`, {  
          headers : { 
            Authorization: `Bearer ${token}`
           },
         });  
        const project = response.data;
        */
        const response = await getProject(token,id);
        //console.log("Fetched 2 project data", response);
        setName(response.data.name);
        setDescription(response.data.description);
        setDueDate(response.data.due_date); 
        //setDueDate(project.dueDate.split('T')[0]); // format date for input field
        //console.log("setted name", response.data.name);

      } catch (error) {
        console.error("Error fetching project:", error);
        //alert("Failed to fetch project details.");
      }   
    }

    fetchProject();

  }, [id,token]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {  
        // const token = localStorage.getItem("token");

        /*
        const response = await api.put(`/projects/${id}`, {  
          name: name,
          description: description,
          due_date : dueDate
        }, {
          headers : { 
            Authorization: `Bearer ${token}`
           },
         });
        */
        const response = await editProject(token, id, { name, description, dueDate });
        setMessage(response.data.message);
        console.log("Project update response data", response.data);
        //alert("Project updated successfully!");
        toast.success(response.data.message || "Project updated successful!");
        navigate('/projects');
        
      } catch (error) {
        console.error("Error updating project:", error);
        //alert("Failed to update project.");
        toast.error("Failed to update project.");
      } finally {
        setLoading(false);
      } 
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Project
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
                {loading ? "Changing Project..." : "Change Project"}
              </button>
              {message && <p className="text-center mt-4 text-red-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditProject;