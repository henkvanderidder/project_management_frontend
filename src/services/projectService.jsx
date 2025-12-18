import api from '../axios';

// get all projects
export const getProjects = async (token) =>  {
  try {
    const response = await api.get("/projects", {  
        headers : { 
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

}

// get single project
export const getProject = async (token, id) =>  {
  try {
    const response = await api.get(`/projects/${id}`, {  
        headers : { 
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log("Fetched project data", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

}

// add new project
export const addProject = async (token, data) =>  {
  try {
    const response = await api.post("/projects", {  
        name: data.name,
        description: data.description,
        due_date : data.dueDate
     }, {
        headers : { 
          Authorization: `Bearer ${token}`
        },
    })

      console.log("Project add response data", response.data);
      return response;

    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
      
    }
}

// add new project
export const editProject = async (token, id, data) =>  {
  try {
    const response = await api.put(`/projects/${id}`, {  
      name: data.name,
      description: data.description,
      due_date : data.dueDate
    }, {
      headers : { 
        Authorization: `Bearer ${token}`
        },
      });

      console.log("Project edit response data", response.data);
      return response;

    } catch (error) {
      console.error("Error editing project:", error);
      throw error;
      
    }
}


export const deleteProject = async (token, id) => {
    try {  
      //const token = localStorage.getItem("token");    
      const response = await api.delete(`/projects/${id}`, {  
        headers : { 
          Authorization: `Bearer ${token}`  
        },
      });  
      console.log("Project deleted:", id);
      return response;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
};