import {useState,useEffect} from "react";
//import api from '../axios';
import { toast } from 'react-toastify';
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { editTask, getTask } from '../services/taskService';
import { getProjects } from '../services/projectService';

function EditTask() {
  const {token} = useAuth();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();
 
  useEffect(() => {

    const fetchTaskAndProjects = async () => {
      try {  
        //const token = localStorage.getItem('token');

        // fetach all projects
        const projectResponse = await getProjects(token);
        //console.log("Projects fetched:", projectResponse.data);
        setProjects(projectResponse.data);
        
        // fetch task details
        const taskResponse = await getTask(token, id);
        
        const task = taskResponse.data;
        
        setProjectId(task.project_id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date); 
        setStatus(task.status);

      } catch (error) {
        console.error("Error fetching projects and task:", error);
      } finally {
        setLoading(false);
      } 
    };

    fetchTaskAndProjects();

  }, [id,token]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {  
        //const token = localStorage.getItem("token");

        const response = await editTask(token, id,{
          projectId: projectId,
          title: title,
          description: description,
          dueDate : dueDate,
          status: status
        });

        console.log("Task update response data", response.data);
        setMessage(response.data.message);
        //alert("Task updated successfully!");
        toast.success(response.data.message || "Task updated successful!");
        navigate('/tasks');
        
      } catch (error) {
        console.error("Error updating task:", error);
        //alert("Failed to update task.");
        toast.error("Failed to update task.");
      } finally {
        setLoading(false);
      } 
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Task
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

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">-- Select Status --</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
                
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Editing Task..." : "Edit Task"}
              </button>
              {message && <p className="text-center mt-4 text-red-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditTask;