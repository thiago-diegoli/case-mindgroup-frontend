import axios, { AxiosError } from 'axios';

const API_URL = 'http://192.168.18.7:3000/auth';

interface Response {
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('nome', response.data.name);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao fazer login';
    } else {
      throw 'Erro inesperado';
    }
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<Response> => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      name,
    });

    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao registrar';
    } else {
      throw 'Erro inesperado';
    }
  }
};
