import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, FlatList, Button, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import fondoPag from '../assets/img/fondoPag.jpg'
import Card from '../components/Card.jsx';
import { getPlatos, getPlatosXNombre } from '../services/buscadorService.js';
import BotonList from '../components/BotonList.jsx';
import { useContextState } from '../contextState.js';


const Home = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const { contextState, setContextState } = useContextState();
    const [Platos, setPlatos] = useState([]);
    const [Busqueda, setBusqueda] = useState({
        lista: []
    });
    const [disable, setDisable] = useState(false);

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
        setBusqueda({ Busqueda: "" })
        setPlatos({ lista: [] })
        if (isFocused) {
            getInitialData();
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
                            //no funciona el disable
                            <View>
                                {
                                    !disable ?
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
                                        :
                                        <ActivityIndicator size="large" style={{ marginTop: '2.5%' }} />
                                }
                            </View>
                        );
                    }}

                />

                <Text style={styles.titulo}>Menú de platos</Text>
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
    prueba: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});