import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  createStockEntry,
  CreateStockHistoryDto,
} from '../services/stockHistoryService';

interface ListItemProps {
  name: string;
  description: string;
  price: number;
  imageBase64: string;
  userId: number | null;
  productId: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  name,
  description,
  price,
  imageBase64,
  userId,
  productId,
  onEdit,
  onDelete,
}) => {
  const loggedInUserId = Number(localStorage.getItem('id'));

  const showActions = userId === loggedInUserId;

  const handleIncreaseStock = async () => {
    const dto: CreateStockHistoryDto = {
      productId,
      action: 'in',
      userId: loggedInUserId,
    };
    try {
      await createStockEntry(dto);
      console.log(`Estoque aumentado para o produto ${name}`);
    } catch (error) {
      console.error('Erro ao aumentar estoque:', error);
    }
  };

  const handleDecreaseStock = async () => {
    const dto: CreateStockHistoryDto = {
      productId,
      action: 'out',
      userId: loggedInUserId,
    };
    try {
      await createStockEntry(dto);
      console.log(`Estoque diminuído para o produto ${name}`);
    } catch (error) {
      console.error('Erro ao diminuir estoque:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageBase64 }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
      {showActions && (
        <View style={styles.actions}>
          <View style={styles.editDeleteActions}>
            <FontAwesome5
              name="pencil-alt"
              size={20}
              color="#039aff"
              onPress={onEdit}
              style={styles.icon}
            />
            <FontAwesome5
              name="trash"
              size={20}
              color="#d10f0f"
              onPress={onDelete}
              style={styles.icon}
            />
          </View>
          <View style={styles.stockActions}>
            <FontAwesome5
              name="plus"
              onPress={handleIncreaseStock}
              size={20}
              color="#0f0"
              style={styles.icon}
            />
            <FontAwesome5
              name="minus"
              onPress={handleDecreaseStock}
              size={20}
              color="#f00"
              style={styles.icon}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E24',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  price: {
    color: '#00FF00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
  },
  editDeleteActions: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stockActions: {
    marginLeft: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    padding: 5,
  },
});

export default ListItem;
