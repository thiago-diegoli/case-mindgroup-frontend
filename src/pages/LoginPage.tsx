import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/authService';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { loginValidationSchema } from '../validators/loginValidation';

const LoginPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const data = await login(values.email, values.password);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Login</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <Input label="Email" placeholder="email@exemplo.com" name="email" />
            <Input
              label="Senha"
              placeholder="*******"
              secureTextEntry
              name="password"
            />
            <SubmitButton
              title="Fazer login"
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
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc1e45',
    marginBottom: 35,
    marginLeft: 5,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default LoginPage;
