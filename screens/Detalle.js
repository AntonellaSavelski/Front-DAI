import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { getPlatosXId, getDetallePlato } from '../services/buscadorService.js';

const Detalle = ({ route, navigation }) => {

    const { id } = route.params
    const [detallePlato, setDetallePlato] = useState({
        nombre: '',
        vegetariano: '',
        vegano: '',
        tiempo: '',
        precio: '',
        imagen: ''
    });

    useEffect(async (vegano) => {
        const detallePlato = await getPlatosXId(id);
        setDetallePlato(detallePlato)
        detalle()
    }, [])

    const detalle = async () => {

      getDetallePlato(id,vegano).then((res) => {
        setDetallePlato({...detallePlato, vegano: res })
    })
        .catch(() => {
            console.log("no entró")
            Alert.alert("no entró")
        });
    }
    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}><strong>Detalle del Plato</strong></Text>
                <View style={styles.detalle}>
                    <header>
                       <Image source={detallePlato.imagen} style={styles.img} />
                    </header>

                    <Text style={styles.texto}><strong>Id: </strong>{id}</Text>
                    <Text style={styles.texto}><strong>Nombre: </strong>{detallePlato.nombre}</Text>
                    <Text style={styles.texto}><strong>Precio: </strong>{detallePlato.precio}</Text>
                    <Text style={styles.texto}><strong>Es vegano: </strong>{detallePlato.vegano}</Text>
                    <Text style={styles.texto}><strong>Es vegetariano: </strong>{detallePlato.vegetariano}</Text>
                    <Text style={styles.texto}><strong>Tiempo de preparación: </strong>{detallePlato.tiempo}</Text>
                </View>
            </View>
        </ImageBackground>

    );
}
export default Detalle

const styles = StyleSheet.create({
    vista: {
        minHeight: "100vh",
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detalle: {
        backgroundColor: 'white',
        textAlign: 'justify',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        margin:0,
        padding: 15,
        marginTop: '2.5%',
        alignItems: 'left'
    },
    texto: {
        marginTop: '1.5%',
        fontSize: 20
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'center',

    },
    img: {
    
    }
});