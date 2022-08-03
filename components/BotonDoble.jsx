import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const BotonDoble = (props) => {

    const { onPress, text } = props
    return (
    
        <TouchableOpacity
            style={style.button}
            onPress={onPress}
        >
            <Text style={style.buttonText}>
                {text}
            </Text>
        
        </TouchableOpacity>
       
    )
}

export default BotonDoble

const style = StyleSheet.create({

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    button: {
        backgroundColor: 'red',
        borderWidth:2,
        borderColor: 'white',
        padding: 15,
        marginTop: '1%',
    },

});
