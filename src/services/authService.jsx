import api from '../axios';

// Handle Login
export const loginService = async (credentials) =>  { 

  const response = await api.post('/login', {
    email: credentials.email,
    password: credentials.password
  });

  return response;  // return the full response object, bevat data en status
}

export const registerService = async (credentials) =>  { 

  const response = await api.post('/register', {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password
  });

  return response;  // return the full response object, bevat data en status
}

export const logoutService = async (token) =>  { 

  const response = await api.post('/logout',{},{
    headers : { 
      Authorization: `Bearer ${token}`  
    },
  });

  return response;  // return the full response object, bevat data en status
}
