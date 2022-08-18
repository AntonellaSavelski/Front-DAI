import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import fondoPag from '../assets/img/fondoPag.jpg'
import BotonDoble from './botonDoble';
import { useNavigation } from '@react-navigation/native';



const Card = (props) => {
    const navigation = useNavigation();

    const onDetallePress = () => {
        navigation.navigate('Detalle', { id: props.id })
        console.log(props.id)
    }
    const onEliminarPress = async () => {
        const newMenu = [...contextState.menu.platos];
        newMenu.filter(p => p.id !== detallePlato.id)
        console.log(newMenu)
        setContextState({
            type: actionTypes.SetMenuPlatos,
            value: newMenu
        })
        navigation.navigate('Home');
    }
    
    return (

        <View style={style.card}>
            <Image
                source={{ uri: props.imagen }}
                style={style.img}
            />

            <Text style={style.texto}><strong>Titulo: </strong>{props.titulo}</Text>
            <Text style={style.texto}><strong>Precio: $ </strong>{props.precio}</Text>
            <Text style={style.texto}><strong>Saludable: </strong>{props.saludable}</Text>
            <Text style={style.texto}><strong>Vegano: </strong>{props.vegano ? 'Si' : 'No'}</Text>

            <View style={style.boton} >
                <BotonDoble
                    text="Ver detalle"
                    title="Ver detalle"
                    onPress={onDetallePress}

                />
                <BotonDoble
                    text="Eliminar plato"
                    title="Eliminar plato"
                    onPress={onEliminarPress}
                />
            </View>

        </View>
    )
}

export default Card

const style = StyleSheet.create({
    img: {
        width: 300,
        height: 150,
        marginBottom: '5%'
    },
    boton: {
        marginTop: '5%',
        minWidth: 150
    },
    card: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        marginTop: '2.5%',
        padding: 15,
        marginHorizontal: 10

    },
    texto: {
        marginBottom: '3%',
        fontSize: 20,
        textAlign: 'left',
        maxWidth: 300,
    },

});
