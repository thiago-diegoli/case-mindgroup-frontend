import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import IconButton from '../components/IconButton';

const DashboardPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo de volta, <br /> {localStorage.getItem('nome')}
      </Text>

      <IconButton
        title="Adicionar produto"
        onPress={() => navigation.navigate('AddProduct')}
        icon={<FontAwesome5 name="plus" size={20} color="#fff" />}
      />

      <IconButton
        title="Ver estoque"
        onPress={() => navigation.navigate('Stock')}
        icon={<FontAwesome5 name="box" size={20} color="#fff" />}
      />

      <IconButton
        title="Ver histórico"
        onPress={() => navigation.navigate('History')}
        icon={<FontAwesome5 name="history" size={20} color="#fff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111115',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default DashboardPage;
