import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Logo from '../components/Logo';
import Button from '../components/Button';

const HomePage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Bem-vindo ao App</Text>

      <Button
        title="Fazer Login"
        onPress={() => navigation.navigate('Login')}
        type="primary"
      />

      <Button
        title="Fazer Cadastro"
        onPress={() => navigation.navigate('Register')}
        type="secondary"
      />

      <Button
        title="Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
        type="secondary"
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

export default HomePage;
