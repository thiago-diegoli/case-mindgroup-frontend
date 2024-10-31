import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useField } from 'formik';

interface InputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  style?: object;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, props.style]}
        {...field}
        {...props}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
      />
      {meta.touched && meta.error ? (
        <Text style={styles.error}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: '#eee',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    color: '#ccc',
  },
  error: {
    color: '#ff6b6b',
    marginTop: 5,
  },
});

export default Input;
