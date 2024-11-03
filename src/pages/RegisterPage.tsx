import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/authService';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { registerValidationSchema } from '../validators/registerValidation';

const RegisterPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const data = await register(values.email, values.password, values.name);
      console.log('Registro bem-sucedido:', data);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Cadastre-se</Title>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <Input label="Nome" placeholder="Seu nome" name="name" />
            <Input label="Email" placeholder="email@exemplo.com" name="email" />
            <Input
              label="Senha"
              placeholder="*******"
              secureTextEntry
              name="password"
            />
            <SubmitButton
              title="Cadastrar"
              onPress={handleSubmit}
              disabled={isSubmitting}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#111115',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc1e45',
    marginBottom: 35,
    marginLeft: 5,
  },
});

export default RegisterPage;
