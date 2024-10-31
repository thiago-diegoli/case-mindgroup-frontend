import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const DashboardPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo de volta, <br /> {localStorage.getItem('nome')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.buttonText}>
          Adicionar produto &nbsp;
          <FontAwesome5 name="plus" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stock')}
      >
        <Text style={styles.buttonText}>
          Ver estoque &nbsp;
          <FontAwesome5 name="box" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.buttonText}>
          Ver histórico &nbsp;
          <FontAwesome5 name="history" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
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
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 2,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#dc1e45',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  secondButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 15,
    borderColor: '#dc1e45',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  secondButtonText: {
    color: '#dc1e45',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DashboardPage;
