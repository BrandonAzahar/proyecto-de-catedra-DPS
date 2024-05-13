import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PantallaPrueba = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es una pantalla de prueba</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
});

export default PantallaPrueba;
