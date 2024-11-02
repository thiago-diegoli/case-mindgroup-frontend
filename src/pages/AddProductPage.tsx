import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Title from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { launchImageLibrary } from 'react-native-image-picker';
import { createProduct } from '../services/productService';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  image: Yup.string().nullable(),
  price: Yup.number()
    .required('Campo obrigatório')
    .positive('Deve ser um valor positivo')
    .nullable(),
});

const AddProductPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAddProduct = async (values: {
    name: string;
    description: string;
    image: string;
    price: number;
  }) => {
    try {
      await createProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        image: values.image,
      });
      console.log('Produto cadastrado:', values);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const handleImagePick = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.errorCode) {
        console.error('Erro ao selecionar imagem:', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;

        fetch(uri)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result as string;
              setFieldValue('image', base64String);
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            console.error('Erro ao converter imagem para Base64:', error);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Title>Cadastrar Produto</Title>
      <Formik
        initialValues={{
          name: '',
          description: '',
          image: '',
          price: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddProduct}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
          <>
            <Input label="Nome" placeholder="Nome do produto" name="name" />
            <Input
              label="Descrição"
              placeholder="Descrição do produto"
              name="description"
            />
            <Input
              label="Imagem"
              placeholder="Imagem (selecionada)"
              name="image"
              editable={false}
            />
            <Input
              label="Valor"
              placeholder="Preço"
              name="price"
              keyboardType="numeric"
              onChangeText={(text: string) =>
                setFieldValue('price', text ? parseFloat(text) : null)
              }
            />
            <Button
              title="Selecionar Imagem"
              onPress={() => handleImagePick(setFieldValue)}
            />
            <SubmitButton
              title="Cadastrar produto"
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
});

export default AddProductPage;
