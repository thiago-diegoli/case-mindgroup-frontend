import axios from 'axios';

const API_URL = 'http://192.168.18.7:3000/stockhistory';

export interface StockHistoryEntry {
  productName: string;
  action: 'in' | 'out';
  timestamp: Date;
  userName: string;
}

export interface CreateStockHistoryDto {
  productId: string;
  action: 'in' | 'out';
  userId: number;
}

export const createStockEntry = async (
  dto: CreateStockHistoryDto
): Promise<StockHistoryEntry> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw 'Token não encontrado. Usuário não autenticado.';
    }

    const response = await axios.post<StockHistoryEntry>(`${API_URL}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Entrada de estoque registrada com sucesso:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao registrar entrada de estoque';
    } else {
      throw 'Erro inesperado';
    }
  }
};

export const getStockHistory = async (): Promise<StockHistoryEntry[]> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw 'Token não encontrado. Usuário não autenticado.';
    }

    const response = await axios.get<StockHistoryEntry[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Histórico de estoque obtido com sucesso:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Erro ao obter histórico de estoque';
    } else {
      throw 'Erro inesperado';
    }
  }
};
