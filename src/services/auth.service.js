import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json'

const API_BASE_URL = config.API_BASE_URL;

async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Login successful');
    } else
        toast.error(data.message);

    return data;
    
  } catch (error) {
    toast.error(`Error occured during login`);
  }
}

async function signup(name, username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    const signupResponse = await response.json();
    if (response.ok) {
      toast.success('Signup successful');
      return login(username, password);
    } else
        toast.error(signupResponse.message);

    return signupResponse;
  } catch (error) {
    toast.error(`Error occured during signup`);
  }
}

export { login, signup };
