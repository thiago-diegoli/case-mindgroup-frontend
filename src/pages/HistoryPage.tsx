import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
  getStockHistory,
  StockHistoryEntry,
} from '../services/stockHistoryService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const HistoryPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [stockHistory, setStockHistory] = useState<StockHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockHistory = async () => {
      try {
        const stockHistoryData = await getStockHistory();
        setStockHistory(stockHistoryData);
      } catch (err) {
        setError('Erro ao carregar histórico de movimentação');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stockHistory}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>Produto: {item.productName}</Text>
            <Text style={styles.itemText}>
              Data: {new Date(item.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.itemText}>Usuário: {item.userName}</Text>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>
                Ação: {item.action === 'in' ? 'Entrada' : 'Saída'}
              </Text>
              {item.action === 'in' ? (
                <FontAwesome5 name="arrow-up" size={32} color="#10e04e" />
              ) : (
                <FontAwesome5 name="arrow-down" size={32} color="#bf0f0f" />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111115',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111115',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111115',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  listItem: {
    backgroundColor: '#1E1E24',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HistoryPage;
