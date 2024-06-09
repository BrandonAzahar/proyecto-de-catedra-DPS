import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import AddEmpleado from './AddPacientes';
import ActionBar from './BarraDeAccion';
import Empleado from './paciente';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

export default function ListEmpleados(props) {
  const { user } = props;
  const [showList, setShowList] = useState(true);
  const [empleado, setEmpleado] = useState([]);
  const [pasarEmpleado, setPasarEmpleado] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    if (!user || !user.uid) {
      console.error('El usuario no está definido');
      return;
    }

    setEmpleado([]);
    setPasarEmpleado([]);
    db.collection(user.uid)
      .orderBy('dateContract', 'asc')
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      });
    setReloadData(false);
  }, [reloadData, user]);

  const formatData = (items) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const empleadoTempArray = [];
    const pasarEmpleadoTempArray = [];
    items.forEach((item) => {
      const dateContract = new Date(item.dateContract.seconds * 1000);
      const contractday = moment(dateContract);
      const currentYear = moment().get('year');
      contractday.set({ year: currentYear });
      const diffDate = currentDate.diff(contractday, 'days');
      const itemTemp = item;
      itemTemp.dateContract = contractday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        empleadoTempArray.push(itemTemp);
      } else {
        pasarEmpleadoTempArray.push(itemTemp);
      }
    });
    setEmpleado(empleadoTempArray);
    setPasarEmpleado(pasarEmpleadoTempArray);
  };

  const daleteEmpleado = (empleado) => {
    Alert.alert(
      'Cancelar pedido',
      `¿Seguro de cancelar pedido ${empleado.pedido} ${empleado.tipopedido}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            db.collection(user.uid)
              .doc(empleado.id)
              .delete()
              .then(() => {
                setReloadData(true);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {empleado.map((item, index) => (
            <Empleado key={index} empleado={item} daleteEmpleado={daleteEmpleado} />
          ))}
          {pasarEmpleado.map((item, index) => (
            <Empleado key={index} empleado={item} daleteEmpleado={daleteEmpleado} />
          ))}
        </ScrollView>
      ) : (
        <AddEmpleado user={user} setShowList={setShowList} setReloadData={setReloadData} />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});
