import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Splash from './components/pantallas/inicio';
import Login from './components/pantallas/login';
import Registrarse from './components/pantallas/registrarse';
import Paciente from './components/pantallas/ListPaciente';
import SobreNosotros from './components/pantallas/sobrenosotros';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuDoc from './components/pantallas/MenuDoc';
import firebase from './components/utils/firebase';
import base64 from 'react-native-base64';
import 'firebase/auth';

const Stack = createNativeStackNavigator();

function btoa(data) { 
  return new base64(data, "binary").toString("base64"); 
}

function atob(data) { 
  return new base64(data, "base64").toString("binary"); 
}

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (

    




    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{ title: 'Asilo de ancianos Nueva Esperanza' }}
          component={SplashInicio}
        />
        <Stack.Screen
          name="IniciarSesion"
          options={{ title: 'Inicio de sesión' }}
          component={Login}
        />
        <Stack.Screen
          name="MenuDoc"
          options={{ title: 'pacientes, citas' }}
          component={Paciente}
        />
        <Stack.Screen
          name="Registro"
          options={{ title: 'Registrarse' }}
          component={Registrarse}
        />
        <Stack.Screen
          name="SobreNosotros"
          options={{ title: 'Sobre nosotros' }}
          component={SobreNosotros}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Logins = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Inicio de sesión</Text>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Registro')}
        style={styles.button}
      />
      <Button
        title="Sobre nosotros"
        onPress={() => navigation.navigate('SobreNosotros')}
        style={styles.button}
      />
    </View>
  );
};

const SplashInicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Splash />
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('IniciarSesion')}
        style={styles.button}
      />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Registro')}
        style={styles.button}
      />
      <Button
        title="Sobre nosotros"
        onPress={() => navigation.navigate('SobreNosotros')}
        style={styles.button}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  boton1: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 130,
    borderRadius: 15,
    width: '90%',
  },
  boton2: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 100,
    borderRadius: 15,
    width: '90%',
  },
  boton3: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 40,
    borderRadius: 15,
    width: '90%',
  },
  boton4: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 40,
    marginTop: -380,
    borderRadius: 15,
    width: '90%',
  },
  boton5: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 40,
    marginTop: 195,
    borderRadius: 15,
    width: '90%',
  },
});
