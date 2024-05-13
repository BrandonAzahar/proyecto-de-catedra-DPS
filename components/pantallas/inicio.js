import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const imagenes = [
  require('../imaggenes/imagensi.jpg'),
  require('../imaggenes/imagensi.jpg'),
  require('../imaggenes/imagensi.jpg'),
];

const Inicio = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        const currentIndex = swiperRef.current.state.index;
        const nextIndex = (currentIndex + 1) % imagenes.length;
        swiperRef.current.scrollBy(nextIndex - currentIndex, true);
      }
    }, 3000); // Cambia el tiempo en milisegundos según tus necesidades

    return () => clearTimeout(timer);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      autoplay={false} // Desactiva el autoplay de Swiper
    >
      {imagenes.map((imagen, index) => (
        <View key={index} style={styles.slide}>
          <Image source={imagen} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Inicio;

