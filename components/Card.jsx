import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import fondoPag from '../assets/img/fondoPag.jpg'
import BotonDoble from './BotonDoble.jsx';
import { useNavigation } from '@react-navigation/native';
import { useContextState, actionTypes } from '../contextState';



const Card = (props) => {
    const navigation = useNavigation();
    const { contextState, setContextState } = useContextState();

    const onDetallePress = () => {
        navigation.navigate('Detalle', { id: props.id })
        console.log(props.id)
    }
    const onEliminarPress = async () => {
        const newMenu = contextState.menu.platos.filter(p => p.id !== props.id);
        console.log(newMenu)
        setContextState({
            type: actionTypes.SetMenuPlatos,
            value: newMenu
        })
        navigation.navigate('Home');
        setContextState({
            type: actionTypes.SetAddPrecio,
            value: -(props.precio)
        })
        setContextState({
            type: actionTypes.SetAddSaludable,
            value: -(props.saludable)
        })
        if (props.vegano) {
            setContextState({
                type: actionTypes.SetAddVegano,
                value: (-1)
            })
        }
        else if (!props.vegano) {
            setContextState({
                type: actionTypes.SetAddNoVegano,
                value: (-1)
            })
        }
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
