import api from '../axios';
import DashboardLayout from "../components/DashboardLayout";
import {useParams } from "react-router-dom";
import {useEffect, useState} from "react";

function ProjectDetails() {
  const {id} = useParams();
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {  
        const token = localStorage.getItem("token");    
        const response = await api.get(`/projects/${id}`, {  
          headers : { 
            Authorization: `Bearer ${token}`
           },
        });  

        console.log("Project details loaded:", response.data);
        setProjectDetails(response.data);
  
      } catch (error) {
        console.error("Error loading projectdetails:", error);
        alert("Failed to load project details.");
      }   
    }

    fetchProject();

  }, [id]);



  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Project Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            { projectDetails?.name }
          </h2>
          <p className="text-gray-600 mb-4">
            { projectDetails?.description }
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="text-sm text-gray-500">Due Date</span>
              <p className="text-gray-800 font-medium">{projectDetails?.due_date}</p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        {projectDetails?.tasks?.length == 0 ? (
          <p className="text-gray-600">No tasks found for this project.</p>
        ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {projectDetails?.tasks?.map((task) => (
                <tr key="{task.id}" className="hover:bg-gray-50">
                  <td className="px-6 py-4">{task.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 text-yellow-600 font-medium">
                    {task.status === 'pending' ? (
                      <span className="px-2 py-1 bg-yellow-100 rounded-full">Pending</span>
                    ) : task.status === 'in_progress' ? (
                      <span className="px-2 py-1 bg-blue-100 rounded-full">In Progress</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 rounded-full">Completed</span>
                    ) }
                  </td>
                  <td className="px-6 py-4 text-gray-700">{task.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default ProjectDetails;