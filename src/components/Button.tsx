import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
}) => {
  const isPrimary = type === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={
          isPrimary ? styles.primaryButtonText : styles.secondaryButtonText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#dc1e45',
  },
  secondaryButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#dc1e45',
    borderWidth: 1,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#dc1e45',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
