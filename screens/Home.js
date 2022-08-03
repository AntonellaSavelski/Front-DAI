import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import { getLogIn } from '../axios/axios.js';
import { postLogIn } from '../axios/axiosLogIn.js';
import fondoPag from '../assets/img/fondoPag.jpg'
import Card from '../components/Card.jsx';

const Home = ({ navigation }) => {

    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
                <Text style={styles.titulo}>Menú de platos</Text>

                <Card/>
            </View>
        </ImageBackground>

    );
}

export default Home

const styles = StyleSheet.create({
    vista: {
        height: 970,
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        marginBottom: '1%',
        fontWeight: 'bold'
    },
});