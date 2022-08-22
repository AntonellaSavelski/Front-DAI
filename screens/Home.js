import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, FlatList, Button, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import fondoPag from '../assets/img/fondoPag.jpg'
import Card from '../components/Card.jsx';
import { getPlatos, getPlatosXNombre } from '../services/buscadorService.js';
import BotonList from '../components/BotonList.jsx';
import { actionTypes, useContextState } from '../contextState.js';


const Home = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const { contextState, setContextState } = useContextState();
    const [Platos, setPlatos] = useState([]);
    const [Busqueda, setBusqueda] = useState({
        lista: []
    });
    const [disable, setDisable] = useState(false);
    let platosEnMenu=0;
    let mostrarInfo=false;
    if (contextState.menu.platosNoVeganos>0 || contextState.menu.platosVeganos>0) {
        mostrarInfo = true;
    }

    const getPlatosPorNombre = async (search) => {
        let tamano = search.length;

        if (!search || tamano <= 2) {
            console.log("Por favor ingrese un plato que contenga más de 2 caracteres")
            setBusqueda({ lista: [] })

        }
        else {
            getPlatosXNombre(search).then((res) => {
                setBusqueda({ lista: res })
            })
                .catch(() => {
                    console.log("no entró")
                    Alert.alert("no entró")
                });
        }
    }
    const onDetallePress = (item) => {
        navigation.navigate('Detalle', { id: item.id })
        //volver a que el search no tenga valor
    }
    useEffect(() => {

        if (contextState.token === '') {
            console.log("No estás autorizado para acceder")
            navigation.navigate("LogIn")
        } else {
            setBusqueda({ Busqueda: "" })
            setPlatos({ lista: [] })
            if (isFocused) {
                getInitialData();
            }
        }

    }, [isFocused]);

    const getInitialData = async () => { }

    return (
        <ImageBackground source={fondoPag} style={styles.image} >
            <View style={styles.vista}>
                <TextInput style={styles.textInput}
                    placeholder="Ingrese el nombre del plato"
                    onChangeText={(search) => { getPlatosPorNombre(search) }}
                />
                <FlatList style={styles.flatlist}
                    keyExtractor={(item) => item.title}
                    data={Busqueda.lista}
                    renderItem={({ item }) => {

                        return (
                            <View>
                                <TouchableOpacity onPress={() => { onDetallePress(item) }}>
                                    <View style={styles.boton}>
                                        <BotonList
                                            disable={disable}
                                            text={item.title}
                                            onPress={() => { onDetallePress(item) }}
                                        />

                                        {item.image && (
                                            <Image
                                                source={item.image}
                                                style={styles.img}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}

                />
                <Text style={styles.titulo}>Menú de platos</Text>
                {
                                mostrarInfo
                                    ?
                                    <View style={styles.menu}>
                                        <Text style={styles.texto}> <strong>INFORMACIÓN DEL MENU COMPLETO</strong></Text>
                                        <Text style={styles.texto}><strong>Promedio de HealthScore: </strong>{contextState.menu.puntajeSaludable.toFixed()}</Text>
                                        <Text style={styles.texto}><strong>Precio: $</strong>{contextState.menu.precioTotal.toFixed()}</Text>
                                        <Text style={styles.texto}><strong>Platos Veganos: </strong>{contextState.menu.platosVeganos}</Text>
                                        <Text style={styles.texto}><strong>Platos No Veganos: </strong>{contextState.menu.platosNoVeganos}</Text>
                                    </View>
                                    :
                                    <View style={styles.menu}>
                                        <Text style={styles.texto}><strong>AÚN NO HAY PLATOS EN EL MENÚ </strong></Text>
                                    </View>
                }
                

                <FlatList
                    horizontal={true}
                    keyExtractor={(item) => item.title}
                    data={contextState.menu.platos}
                    renderItem={({ item }) => {
                        return (
                            <Card
                                id={item.id}
                                imagen={item.image}
                                titulo={item.title}
                                saludable={item.healthScore}
                                precio={item.pricePerServing}
                                vegano={item.vegan}
                            />
                        );
                    }}
                />
            </View>
        </ImageBackground>
    );
}

export default Home

const styles = StyleSheet.create({
    vista: {
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boton: {
        borderWidth: 1,
        paddingHorizontal: '8%',
        paddingVertical: 15,
        minWidth: "100%",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginTop: '1%',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        minHeight: '100vh',
    },
    img: {
        height: 100,
        width: '25%',
    },
    titulo: {
        fontSize: 30,
        marginBottom: '1%',
        fontWeight: 'bold',
        marginTop: '3%'
    },
    textInput: {
        borderWidth: 1,
        padding: 15,
        width: "80%",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginTop: '1%',
    },
    flatlist: {
        width: "70%",
    },
    menu: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        marginHorizontal: 10,
        padding: 15,
        marginTop: '2%',
        marginBottom: '1.5%',
        
    },
    texto: {
        marginBottom: '2%',
        fontSize: 18,
        textAlign: 'left',
        
    },
});