import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { getPlatosXId } from '../services/buscadorService.js';
import { actionTypes, useContextState } from '../contextState.js';
import { AntDesign } from '@expo/vector-icons';

const Detalle = ({ route, navigation }) => {
    

    const { id } = route.params
    const { contextState, setContextState } = useContextState();
    const [detallePlato, setDetallePlato] = useState([]);
    const [cargado, setCargado] = useState("false");
    let estaEnMenu = contextState.menu.platos.find(plato => plato.id === detallePlato.id)

    useEffect(async () => {
        if(contextState.token===''){
            console.log("No estás autorizado para acceder")
            navigation.navigate("LogIn")
        }else{
            const detallePlato = await getPlatosXId(id);
            setDetallePlato(detallePlato)
            setCargado("true")
        }

    }, [])

    const onAgregarPress = async () => {
        if (contextState.menu.platos.length < 4 && contextState.menu.platosVeganos < 2 && contextState.menu.platosNoVeganos < 2) {
            //agregar el plato al menu
            const newMenu = [...contextState.menu.platos];
            newMenu.push(detallePlato);
            setContextState({
                type: actionTypes.SetMenuPlatos,
                value: newMenu
            })
            navigation.navigate('Home');
            setContextState({
                type: actionTypes.SetAddPrecio,
                value: detallePlato.pricePerServing
            })
            setContextState({
                type: actionTypes.SetAddSaludable,
                value: detallePlato.healthScore
            })
            if (detallePlato.vegan) {
                setContextState({
                    type: actionTypes.SetAddVegano,
                    value: 1
                })
            }
            else if (!detallePlato.vegan) {
                setContextState({
                    type: actionTypes.SetAddNoVegano,
                    value: 1
                })
            }
            console.log(contextState.menu)
        }
        else {
            console.log("No se puede agregar plato al menú")
            Alert.alert("No se puede agregar plato al menú")
            //UNA VEZ QUE ME TIRA ESTO YA NO PUEDO AGREGAR OTRO PLATO
        }

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
    if (cargado==="false"){
        return(
            <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
            <Text style={styles.titulo}> Cargando</Text>
            <ActivityIndicator size="large" style={{marginTop: '2.5%'}}/>
            </View>
            </ImageBackground>
        );

    }else{
        return (
            
            <ImageBackground source={fondoPag} >
                
                    <View style={styles.vista}>

                        <Text style={styles.atras}
                            onPress={() => {
                                navigation.navigate('Home')
                            }}>
                            Volver atrás
                        </Text>
                        <Text style={styles.titulo}><strong>Detalle del Plato</strong></Text>
                        <View style={styles.detalle}>
                            <Image
                                source={{ uri: detallePlato.image }}
                                style={styles.img}
                            />
                            <Text style={styles.texto}><strong>Id: </strong>{id}</Text>
                            <Text style={styles.texto}><strong>Nombre: </strong>{detallePlato.title}</Text>
                            <Text style={styles.texto}><strong>Precio: $</strong>{detallePlato.pricePerServing}</Text>
                            <Text style={styles.texto}><strong>Es vegano: </strong>{detallePlato.vegan ? 'Si' : 'No'}</Text>
                            <Text style={styles.texto}><strong>Es vegetariano: </strong>{detallePlato.vegetarian ? 'Si' : 'No'}</Text>
                            <Text style={styles.texto}><strong>Puntaje saludable: </strong>{detallePlato.healthScore}</Text>
                            {
                                estaEnMenu
                                    ?
                                    <Boton style={{ width: '100%' }}
                                        text="Eliminar"
                                        title="Eliminar"
                                        onPress={onEliminarPress}
                                    />
                                    :
                                    <Boton style={{ width: '100%' }}
                                        text="Agregar al menú"
                                        title="Agregar al menú"
                                        onPress={onAgregarPress}
                                    />
                            }
        
                        </View>
                    </View>
            </ImageBackground>
    
        );
    }
        
}

export default Detalle

const styles = StyleSheet.create({
    vista: {
        minHeight: "100vh",
        alignItems: 'center',
        justifyContent: 'center',
    },
    detalle: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        fontSize: 18,
        marginHorizontal: 10,
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
        width: 300,
        height: 150,
        marginBottom: '5%'
    },
    atras: {
        marginBottom: '2%',
        textDecorationLine: 'underline'
    }


});