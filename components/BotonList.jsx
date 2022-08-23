import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const BotonList = (props) => {

    const { onPress, text, disable } = props
    return (
    
        <TouchableOpacity  
            disabled={disable}
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
    }
});