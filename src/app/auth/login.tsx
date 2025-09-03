import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {AppText} from "@/components/AppText";
import {Link} from "expo-router";
import FormInput from "@/components/FormInput";
import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email: string, password: string}>({email, password});
    
    const validate = () => {
        let valid = true;
        let tempErrors = {email: "", password: ""};
        
        if (!email) {
            tempErrors.email = "Email is required";
            valid = false;
        } 
    }
    
    return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        {/*<AppText>Login</AppText>e*/}
                        <Link href="/auth/sign-up" asChild>
                            <Text>Sign up</Text>
                        </Link>
                        <FormInput
                            label="Email"
                            value={email}
                            onChangeText={() => setErrors}
                            placeholder="Username"
                            secureTextEntry={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            error={errors.email}
                        />
                        <FormInput
                            label="Password"
                            value={password}
                            onChangeText={() => console.log(password)}
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            error={errors.password}
                        />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            )
}