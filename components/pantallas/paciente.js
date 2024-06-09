import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
export default function Empleado(props) {
const {empleado, daleteEmpleado} = props;
const pasat = empleado.days > 0 ? true : false;
const infoDay = () => {
if (empleado.days === 0) {
return <Text style={{color: '#fff'}}>Aniversario de contrato</Text>;
} else {
const days = -empleado.days;
return (
<View style={styles.textCurrent}>
<Text>{days}</Text>
<Text>{days === 1 ? 'Dia' : 'Dias'}</Text>
</View>
);
}
};
return (
<TouchableOpacity
style={[
styles.card,
pasat
? styles.pasat
: empleado.days === 0
? styles.actual
: styles.current,
]}
onPress={() => daleteEmpleado(empleado)}>
<Text style={styles.userName}>
{empleado.name} {empleado.lastname}
</Text>
{pasat ? <Text style={{color: '#fff'}}>Pasado</Text> : infoDay()}
</TouchableOpacity>
);
}
const styles = StyleSheet.create({
card: {
flexDirection: 'row',
justifyContent: 'space-between',
height: 60,
alignItems: 'center',
paddingHorizontal: 10,
margin: 10,
borderRadius: 15,
},
actual: {
backgroundColor: 'pink',
},
current: {
backgroundColor: '#1ae1f2',
},
pasat: {
backgroundColor: '#820000',
},
userName: {
color: '#fff',
fontSize: 16,
},
textCurrent: {
backgroundColor: '#fff',
borderRadius: 20,
width: 50,
alignItems: 'center',
justifyContent: 'center',
},
});
