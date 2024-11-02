import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#dc1e45',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#111',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SubmitButton;
