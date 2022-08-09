import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BotonList = (props) => {

    const { onPress, text, disable, image } = props
    return (
    
        <TouchableOpacity
            
            disabled={disable}
            style={[style.platos, {backgroundImage: image} ]}

            onPress={onPress}
        >
            <Image 
            source={{image}}

            />
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
        marginTop: '1%',
        width: "80vh",
        backgroundColor: "white"
    }

});