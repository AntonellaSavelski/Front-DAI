import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { getLogIn } from '../axios/axios.js';


const LogIn = ({ navigation }) => {
    const [userState, setUserState] = useState({
        usuario: '',
        contraseña: '',
    });

    const onLogInPress = async (e) => {

        if (!userState.usuario || !userState.contraseña) {
            Alert.alert("Por favor ingresar todos los datos")
        } else {
            await getLogIn(userState).then(() => {
                navigation.navigate('SiguientePag')
            })
                .catch(() => {
                    console.log("no entró")
                    Alert.alert("Datos incorrectos")
                });
        }
    }

    return (

            <ImageBackground source={fondoPag}>
                <View style={styles.vista}>
                    <Text style={styles.titulo}>Inicio de sesión</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ingrese su usuario"
                        name="usuario"
                        value={userState.usuario}
                        onChangeText={text => setUserState({ ...userState, usuario: text })}

                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ingrese su Contraseña"
                        name="contrasena"
                        value={userState.contraseña}
                        secureTextEntry={true}
                        onChangeText={text => setUserState({ ...userState, contraseña: text })}
                    />
                    <Boton
                        text="Iniciar Sesion"
                        title="Iniciar Sesion"
                        onPress={onLogInPress}
                    />
                    <Text style={styles.texto}
                        onPress={() => {
                            navigation.navigate('')
                        }}
                    >No tenes una cuenta? Registrate</Text>
                </View>
            </ImageBackground>

    );
}

export default LogIn

const styles = StyleSheet.create({
    vista: {
        height: '100%',
    }
});