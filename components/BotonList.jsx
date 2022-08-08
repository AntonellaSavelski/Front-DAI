import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const BotonList = (props) => {

    const { onPress, text, disable } = props
    return (
    
        <TouchableOpacity
            disabled={disable}
            style={style.platos}
            onPress={onPress}
        >
            <Text style={style.buttonText}>
                {text}
            </Text>
        
        </TouchableOpacity>
       
    )
}

export default BotonList

const style = StyleSheet.create({

    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
    platos: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 3,
        backgroundColor: "#fff",
        marginTop: '1%',
        width: "100vh",
    }

});
