import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validacion';
import firebase from '../utils/firebase';
import { useNavigation } from '@react-navigation/native'; // Agregamos la importación de useNavigation
import MenuDoc from './MenuDoc';




export default function LoginForm(props) {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const navigation = useNavigation();

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          navigation.navigate('MenuDoc'); // Navegamos a la pantalla de menú
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };


  return (
    <>
    
      <TextInput
        style={[
          styles.input,
          formError.email && styles.error,
        ]}
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc"
        onChange={(e) => onChange(e, 'email')}
      />
      <TextInput
        style={[
          styles.input,
          formError.password && styles.error,
        ]}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}
      />
      <TouchableOpacity onPress={login} style={styles.loginButton}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: 'black',
    width: '80%',
    marginBottom: 25,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#555',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  error: {
    borderColor: '#ff3333',
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
});

