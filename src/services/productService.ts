import axios from 'axios';
import { Buffer } from 'buffer';

const API_URL = 'http://192.168.18.7:3000/products';

export interface ProductFromBackend {
  id: string;
  name: string;
  description: string;
  value: string;
  image: {
    type: string;
    data: number[];
  } | null;
  userId: null | number;
}

export interface ProductToCreate {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  userId: null | number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const token = localStorage.getItem('access_token');

    const response = await axios.get<ProductFromBackend[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.map((product) => {
      let formattedImage = '';

      if (product.image) {
        let base64Image = Buffer.from(product.image.data).toString('base64');
        console.log(base64Image);

        let prefixEnd = base64Image.indexOf('base64');
        if (prefixEnd !== -1) {
          let slashIndex = base64Image.indexOf('/') + 1;
          let imgType = base64Image.substring(slashIndex, prefixEnd);
          console.log(imgType);
          let base64Data = base64Image.substring(prefixEnd + 6);

          formattedImage = `data:image/${imgType};base64,${base64Data}`;
          console.log(formattedImage);
        }
      }

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.value),
        image: formattedImage,
        userId: product.userId,
      };
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao buscar produtos';
    } else {
      throw 'Erro inesperado';
    }
  }
};
export const createProduct = async (
  product: ProductToCreate
): Promise<void> => {
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

export const deleteProduct = async (
  id: string,
  userId: number
): Promise<void> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw 'Token não encontrado. Usuário não autenticado.';
    }

    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId,
      },
    });

    console.log(`Produto ${id} deletado com sucesso.`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao deletar produto';
    } else {
      throw 'Erro inesperado';
    }
  }
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>,
  userId: number
): Promise<void> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw 'Token não encontrado. Usuário não autenticado.';
    }

    const updateData = {
      ...product,
      value: parseFloat(product.price as any) || 0,
      userId,
    };

    await axios.put(`${API_URL}/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`Produto ${id} atualizado com sucesso.`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao atualizar produto';
    } else {
      throw 'Erro inesperado';
    }
  }
};
