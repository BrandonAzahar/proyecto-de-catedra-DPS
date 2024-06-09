import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/auth';
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

export default function AddEmpleado(props) {
  const { user, setShowList, setReloadData } = props;
  const [formData, setFormData] = useState({});
  const [isDatePicketVisible, setIsDatePicketVisible] = useState(false);
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setIsDatePicketVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePicketVisible(true);
  };

  const handlerConfirm = (date) => {
    const dateContract = date;
    dateContract.setHours(0);
    dateContract.setMinutes(0);
    dateContract.setSeconds(0);
    setFormData({ ...formData, dateContract });
    hideDatePicker();
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    let errors = {};

    if (!formData.numeromesa || !formData.pedido || !formData.tipopedido || !formData.dateContract) {
      if (!formData.numeromesa) errors.numeromesa = true;
      if (!formData.pedido) errors.pedido = true;
      if (!formData.tipopedido) errors.tipopedido = true;
      if (!formData.dateContract) errors.dateContract = true;
    } else if (!user || !user.uid) {
      Alert.alert('Error', 'El usuario no está definido');
    } else {
      const data = formData;
      data.dateContract.setYear(0);
      db.collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true);
          setShowList(true);
        })
        .catch(() => {
          setFormError({ pedido: true, tipopedido: true, dateContract: true });
        });
    }

    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.numeromesa && { borderColor: '#940c0c' }]}
          placeholder="tipo de citologia que lleva"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'numeromesa')}
        />
        <TextInput
          style={[styles.input, formError.pedido && { borderColor: '#940c0c' }]}
          placeholder="paciente"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'pedido')}
        />
        <TextInput
          style={[
            styles.input,
            formError.tipopedido && { borderColor: '#940c0c' },
          ]}
          placeholder="especialidad"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'tipopedido')}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.dateContract && { borderColor: '#940c0c' },
          ]}
        >
          <Text
            style={{
              color: formData.dateContract ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}
          >
            {formData.dateContract
              ? moment(formData.dateContract).format('LL')
              : 'Fecha de cita'}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Crear pedido</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePicketVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datepicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#1e3040',
    padding: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
});
