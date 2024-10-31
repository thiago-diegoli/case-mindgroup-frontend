import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Logo from '../components/Logo';

const HomePage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Bem-vindo ao App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.secondButtonText}>Fazer Cadastro</Text>
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

export default HomePage;
