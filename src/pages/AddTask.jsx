import {useState,useEffect} from "react";
//import api from '../axios';
import { toast } from 'react-toastify';
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { addTask } from '../services/taskService';
import { getProjects } from '../services/projectService';

function AddTask() {
  const {token} = useAuth();
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {  
        //const token = localStorage.getItem('token');

        const response = await getProjects(token);
        console.log("Projects fetched:", response.data);
        setProjects(response.data);
        
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      } 
    };

    fetchProjects();

  }, [token]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {  
        const response = await addTask(token, {
          projectId: projectId,
          title: title,
          description: description,
          dueDate : dueDate
        });

        console.log("Task add response data", response.data);
        setMessage(response.data.message);
        //alert("Task added successfully!");
        toast.success(response.data.message || "Task added successful!");

        navigate('/tasks');
        
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task.");
      } finally {
        setLoading(false);
      } 
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Task
          </h2>

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Project
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
              >
                <option value="">-- Select Project --</option>
                {/* Dynamically populate projects here */}  
                {projects.map((project) => (
                  <option value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
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
                placeholder="Enter task description"
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
                {loading ? "Adding Task..." : "Add Task"}
              </button>
              {message && <p className="text-center mt-4 text-red-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddTask;