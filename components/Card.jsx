import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import fondoPag from '../assets/img/fondoPag.jpg'
import BotonDoble from './botonDoble';

const Card = (props) => {

    return (

        <View style={style.card}>
             <Image
                        source={{ uri: props.imagen }}
                        style={style.img}
                    />
            <Text style={style.lista} >
                Titulo: {props.titulo} <br />
                Precio: {props.precio}<br />
                Tiempo: {props.tiempo}<br />
                Vegano: {props.vegano ? 'Si' : 'No'}<br />

                <BotonDoble style={style.boton}
                    text="Ver detalle"
                    title="Ver detalle"

                />
                <BotonDoble
                    text="Eliminar plato"
                    title="Eliminar plato"

                />
            </Text>
        </View>
    )
}

export default Card

const style = StyleSheet.create({
    img: {
        width: '100%',
        height: 150,
        marginBottom: '5%'
    },
    boton:{
        marginTop: '5%'
    },
    card: {
        backgroundColor: 'white',
        textAlign: 'justify',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        margin:0,
        padding: 15,
        marginTop: '2.5%',
        alignItems: 'center'
    },

});
