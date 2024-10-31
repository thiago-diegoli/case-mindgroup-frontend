import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface LogoProps {
  style?: ImageStyle;
}

const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <Image
      source={{
        uri: 'https://mindconsulting.com.br/wp-content/uploads/2023/08/LOGOTIPO-Mind-Group-Technologies-Branco.png',
      }}
      style={[styles.logo, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 2,
    marginBottom: 30,
  },
});

export default Logo;
