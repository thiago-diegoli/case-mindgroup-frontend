import * as Yup from 'yup';

export const editProductValidationSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  image: Yup.string().nullable(),
  price: Yup.number()
    .required('Campo obrigatório')
    .positive('Deve ser um valor positivo')
    .nullable(),
});
