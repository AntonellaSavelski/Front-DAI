import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { getPlatosXId } from '../services/buscadorService.js';
import { actionTypes, useContextState } from '../contextState.js';

const Detalle = ({ route, navigation }) => {

    const { id } = route.params
    const {contextState, setContextState} = useContextState();
    const [detallePlato, setDetallePlato] = useState([]);
    
    useEffect((e) => {
        async function detallesPlato() {
            const detallePlato = await getPlatosXId(id);
            setDetallePlato(detallePlato)
        }
        detallesPlato()
    }, [])

    const onAgregarPress = async (e) => {
       if(contextState.menu.platos.length < 4 && contextState.menu.platosVeganos< 2 && contextState.menu.platosVegetarianos<2){
            //agregar el plato al menu
            setContextState({
                type: actionTypes.SetMenuPlatos,
                value: detallePlato.title
            })
            console.log(contextState.menu)
            navigation.navigate('Home');
            contextState.menu.precioTotal= contextState.menu.precioTotal + detallePlato.pricePerServing
            console.log(menu.precioTotal)
            contextState.menu.tiempoTotal= contextState.menu.tiempoTotal + detallePlato.readyInMinutes
            if(detallePlato.vegan=='true'){
                contextState.menu.platosVeganos = contextState.menu.platosVeganos + 1
            }
            else if (detallePlato.vegetarian=='true'){
                contextState.menu.platosVegetarianos = contextState.menu.platosVegetarianos+1
                console.log(contextState.menu.platosVegetarianos)
            }

       }
       else {
        console.log("No se puede agregar plato al menú")
        Alert.alert("No se puede agregar plato al menú")
       }

    }
    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}><strong>Detalle del Plato</strong></Text>
                <View style={styles.detalle}>
                        <Image
                            source={{ uri: detallePlato.image}}
                            style={styles.img}
                        />

                    <Text style={styles.texto}><strong>Id: </strong>{id}</Text>
                    <Text style={styles.texto}><strong>Nombre: </strong>{detallePlato.title}</Text>
                    <Text style={styles.texto}><strong>Precio: $</strong>{detallePlato.pricePerServing}</Text>
                    <Text style={styles.texto}><strong>Es vegano: </strong>{detallePlato.vegan ? 'Si' : 'No'}</Text>
                    <Text style={styles.texto}><strong>Es vegetariano: </strong>{detallePlato.vegetarian ? 'Si' : 'No'}</Text>
                    <Text style={styles.texto}><strong>Tiempo de preparación: </strong>{detallePlato.readyInMinutes}</Text>

                    <Boton style={{width:'100%'}}
                     text="Agregar al menú"
                     title="Ver detalle"
                     onPress={onAgregarPress}
                    />
                </View>
            </View>
        </ImageBackground>

    );
}
export default Detalle

const styles = StyleSheet.create({
    vista: {
        minHeight: "100vh",
        alignItems: 'center',
        justifyContent: 'center'
    },
    detalle: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        margin: 0,
        padding: 15,
        marginTop: '2.5%',

    },
    texto: {
        marginBottom: '3%',
        fontSize: 20,
        textAlign: 'left'
    },
    titulo: {
        fontSize: 30,
    },
    img: {
        width: -'100%',
        height: 150,
        marginBottom: '5%'
    }
});