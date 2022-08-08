import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Alert, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/boton.jsx';
import fondoPag from '../assets/img/fondoPag.jpg'
import Card from '../components/Card.jsx';
import { getPlatos, getPlatosXNombre } from '../services/buscadorService.js';
import BotonList from '../components/BotonList.jsx';


const Home = ({ navigation }) => {
    const [Platos, setPlatos] = useState([]);
    const [Busqueda, setBusqueda] = useState({
        lista:[]
    });

    const getPlatosPorNombre = async(search) =>{
        let tamano = search.length;
        
        if(!search || tamano <= 2){
            console.log("Por favor ingrese un plato que contenga más de 2 caracteres")
            setBusqueda({lista:[]})
            
        }
        else {
            getPlatosXNombre(search).then((res)=>{
                setBusqueda({lista:res}) 
            })
            .catch(() => {
                console.log("no entró")
                Alert.alert("no entró")
              });
        }
    }
{/* 
    useEffect(() => {
        getPlatos(setPlatos); //trae la lista de todos los platos
        {Platos && Platos.map((Plato) => (

            console.log(Plato.title) //muestra los nombres de todos los platos
    
        ))}
    }, [])
*/}

    return (
        <ImageBackground source={fondoPag} >
            <View style={styles.vista}>
            <TextInput style={styles.textInput} 
            placeholder= "Ingrese el nombre del plato"
            onChangeText={(search) => {getPlatosPorNombre(search)}}
            />
            <FlatList
            keyExtractor={(item)=>item.title}
            data = {Busqueda.lista}
            renderItem={({item}) =>(
                <BotonList
                text = {item.title}
                onPress = {getPlatos}
                />
                
             )}
      />
                <Text style={styles.titulo}>Menú de platos</Text>

                <Card />
            </View>
        </ImageBackground>

    );
}

export default Home

const styles = StyleSheet.create({
    vista: {
        minHeight: "100vh",
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center'
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
    }
});