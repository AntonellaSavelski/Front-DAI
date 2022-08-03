import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { getLogIn } from '../axios/axios.js';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'


const LogIn = ({ navigation }) => {
    const [userState, setUserState] = useState({
        email: '',
        password: '',
    });

    const onLogInPress = async (e) => {

        if (!userState.email || !userState.password) {
            console.log("Por favor ingresar todos los datos")
            Alert.alert("Por favor ingresar todos los datos")
        } else {
            await postLogIn(userState).then(() => {
                navigation.navigate('Home')
            })
                .catch(() => {
                    console.log("Error 401")
                    Alert.alert("No tiene el ingreso autorizado, lo siento!")
                });
        }
    }
    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}>Inicio de sesión</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ingrese su email"
                    name="email"
                    value={userState.email}
                    onChangeText={email => setUserState({ ...userState, email: email })}

                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Ingrese su password"
                    name="password"
                    value={userState.password}
                    secureTextEntry={true}
                    onChangeText={text => setUserState({ ...userState, password: text })}
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
        height: 970,
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        marginTop: '2.5%',
    },
    titulo: {
        fontSize: 30,
        marginBottom: '1%',
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