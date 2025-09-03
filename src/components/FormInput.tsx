import React from "react";
import {Text, TextInput, View} from "react-native";


const FormInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    secureTextEntry: boolean,
    autoCapitalize: "none",
    keyboardType: "default"
) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
            />
        </View>
    );
}

export default FormInput;