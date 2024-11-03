import { NavigatorScreenParams } from '@react-navigation/native';
import { Product } from '../services/productService';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  AddProduct: undefined;
  Stock: undefined;
  History: undefined;
  EditProductPage: { product: Product };
};
