import api from '../axios';

// get all tasks
export const getTasks = async (token) =>  {
  try {
    const response = await api.get("/tasks", {  
        headers : { 
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }

}

// get single task
export const getTask = async (token, id) =>  {
  try {
    const response = await api.get(`/tasks/${id}`, {  
        headers : { 
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log("Fetched task data", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }

}

// add new task
export const addTask = async (token, data) =>  {
  try {
    const response = await api.post("/tasks", {  
          project_id: data.projectId,
          title: data.title,
          description: data.description,
          due_date : data.dueDate        
     }, {
        headers : { 
          Authorization: `Bearer ${token}`
        },
    })

      console.log("Task add response data", response.data);
      return response;

    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
      
    }
}

// add new task
export const editTask = async (token, id, data) =>  {
  try {
    const response = await api.put(`/tasks/${id}`, {  
      project_id: data.projectId,
      title: data.title,
      description: data.description,
      due_date : data.dueDate,
      status: data.status
    }, {
      headers : { 
        Authorization: `Bearer ${token}`
        },
      });

      console.log("Task edit response data", response.data);
      return response;

    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
      
    }
}


export const deleteTask = async (token, id) => {
    try {  
      //const token = localStorage.getItem("token");    
      const response = await api.delete(`/tasks/${id}`, {  
        headers : { 
          Authorization: `Bearer ${token}`  
        },
      });  
      console.log("Task deleted:", id);
      return response;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
};