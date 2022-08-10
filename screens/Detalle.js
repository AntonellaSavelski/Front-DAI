import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { getPlatosXId } from '../services/buscadorService.js';

const Detalle = ( {route, navigation}) => {

    const { id } = route.params

    //hacer detallePlato y setDetallePlato
    useEffect(async() => {
        const detallePlato = await getPlatosXId(id);
        setDetallePlato(detallePlato)
        
    }, [])

    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}>Detalle del Plato</Text>
                <Text style={styles.titulo}>{id}</Text>
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
    texto: {
        marginTop: '2.5%',
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        textAlign:'center',
        fontWeight: 'bold'
    },
    textInput: {
        borderWidth: 1,
        padding: 15,
        width: "80%",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginTop: '1%',
    }
});