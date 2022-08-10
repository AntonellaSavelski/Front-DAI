import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { getPlatosXId } from '../services/buscadorService.js';

const Detalle = ({ route, navigation }) => {

    const { id } = route.params
    const [detallePlato, setDetallePlato] = useState([]);

    useEffect(async () => {
        const detallePlato = await getPlatosXId(id);
        setDetallePlato(detallePlato)

    }, [])

    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}><strong>Detalle del Plato</strong></Text>
                <View style={styles.detalle}>
                    <header>
                        <Image
                            source={{ uri: detallePlato.image}}
                            style={styles.img}
                        />
                    </header>
                    <Text style={styles.texto}><strong>Id: </strong>{id}</Text>
                    <Text style={styles.texto}><strong>Nombre: </strong>{detallePlato.title}</Text>
                    <Text style={styles.texto}><strong>Precio: $</strong>{detallePlato.pricePerServing}</Text>
                    <Text style={styles.texto}><strong>Es vegano: </strong>{detallePlato.vegan}</Text>
                    <Text style={styles.texto}><strong>Es vegetariano: </strong>{detallePlato.vegetarian}</Text>
                    <Text style={styles.texto}><strong>Tiempo de preparación: </strong>{detallePlato.readyInMinutes}</Text>
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
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        margin: 0,
        padding: 15,
        marginTop: '2.5%',
    },
    texto: {
        marginTop: '1.5%',
        fontSize: 20
    },
    titulo: {
        fontSize: 30,
    },
    img: {
        width: 200,
        height: 100,
        marginBottom: '1.5%'
    }
});