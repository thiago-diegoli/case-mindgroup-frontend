import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ListItemProps {
  name: string;
  description: string;
  price: number;
  imageBase64: string;
  userId: number | null;
  onEdit: () => void;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  name,
  description,
  price,
  imageBase64,
  userId,
  onEdit,
  onDelete,
}) => {
  // Obtém o ID do usuário do localStorage
  const loggedInUserId = Number(localStorage.getItem('id'));

  // Verifica se o userId do produto corresponde ao ID do usuário logado
  const showActions = userId === loggedInUserId;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageBase64 }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
      {showActions && ( // Renderiza os ícones apenas se showActions for true
        <View style={styles.actions}>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 5,
  },
});

export default ListItem;
