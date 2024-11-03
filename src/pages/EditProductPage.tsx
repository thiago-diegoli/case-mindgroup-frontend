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
import { updateProduct } from '../services/productService';
import { Product } from '../services/productService';
import { editProductValidationSchema } from '../validators/editProductValidation';

interface EditProductPageProps {
  route: {
    params: {
      product: Product;
    };
  };
}

const EditProductPage: React.FC<EditProductPageProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { product } = route.params;

  const handleEditProduct = async (values: {
    name: any;
    description: any;
    price: any;
    image: any;
  }) => {
    try {
      const userId = localStorage.getItem('id');
      if (userId) {
        await updateProduct(
          product.id,
          {
            name: values.name,
            description: values.description,
            price: values.price,
            image: values.image,
          },
          parseInt(userId)
        );
        console.log('Produto editado:', values);
        navigation.navigate('Dashboard');
      } else {
        console.error('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao editar produto:', error);
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
      <Title>Editar Produto</Title>
      <Formik
        initialValues={{
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
        }}
        validationSchema={editProductValidationSchema}
        onSubmit={handleEditProduct}
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
              onChangeText={(text) =>
                setFieldValue('price', text ? parseFloat(text) : null)
              }
            />
            <Button
              title="Selecionar Imagem"
              onPress={() => handleImagePick(setFieldValue)}
            />
            <SubmitButton
              title="Editar produto"
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

export default EditProductPage;
