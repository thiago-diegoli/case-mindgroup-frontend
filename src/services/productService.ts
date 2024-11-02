import axios, { AxiosError } from 'axios';

const API_URL = 'http://192.168.18.7:3000/products';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

export const createProduct = async (product: Product): Promise<void> => {
  try {
    const token = localStorage.getItem('access_token');

    const response = await axios.post(
      API_URL,
      {
        ...product,
        value: parseFloat(product.price as any) || 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Produto criado com sucesso:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao criar produto';
    } else {
      throw 'Erro inesperado';
    }
  }
};
