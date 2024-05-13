import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SobreNosotros = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Nosotros</Text>
      <Text style={styles.description}>
        Somos una organizacion comprometida con el cuidado y bienestar de nuestros residentes en el Asilo de Ancianos Esperanza de Santa Ana. Nuestro equipo de profesionales medicos y de apoyo se esfuerza por brindar la mejor atencion posible a cada uno de nuestros residentes.
      </Text>
      <Text style={styles.description}>
        Si tienes alguna pregunta o inquietud, no dudes en contactarnos. Estamos aquí para ayudarte.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SobreNosotros;
