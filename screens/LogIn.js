import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/Boton.jsx';
import { postLogIn } from '../services/logInService';
import fondoPag from '../assets/img/fondoPag.jpg'
import { actionTypes, useContextState } from '../contextState.js';

const LogIn = ({ navigation }) => {
    const {contextState, setContextState} = useContextState();
    const [userState, setUserState] = useState({
        email: '',
        password: '',
    });
    const [disable, setDisable] = useState(false);

    const onLogInPress = async (e) => {
        setDisable(true)
        if (!userState.email || !userState.password) {
            console.log("Por favor ingresar todos los datos")
            Alert.alert("Por favor ingresar todos los datos")
        } else {
            await postLogIn(userState).then((res) => {
                setContextState({
                    type: actionTypes.SetToken,
                    value: res
                })
                console.log(contextState)
                
                navigation.navigate('Home')
                setDisable(false)
            })
                .catch(() => {
                    console.log("Error 401")
                    Alert.alert("No tiene el ingreso autorizado, lo siento!")
                    setDisable(false)
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
                <View style={{width:'80%'}}>
                {
                    !disable ? 
                    <Boton
                    text="Iniciar Sesion"
                    title="Iniciar Sesion"
                    disable={ disable }
                    onPress={onLogInPress}
                    /> :
                    <ActivityIndicator size="large" style={{marginTop: '2.5%'}}/>
                }
                </View>

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
       minHeight: "100vh",
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