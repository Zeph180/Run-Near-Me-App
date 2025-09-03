import {TextInputProps} from "react-native";

type FormInputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoComplete?: TextInputProps['autoComplete'];
    error?: string;
    keyboardType?: TextInputProps['keyboardType'];
}

export default FormInputProps;