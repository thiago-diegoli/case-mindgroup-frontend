import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TitleProps {
  children: string;
  style?: TextStyle;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc1e45',
    marginBottom: 35,
    marginLeft: 5,
  },
});

export default Title;
