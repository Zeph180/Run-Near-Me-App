import {Animated, Text} from "react-native";
import View = Animated.View;
import {AppText} from "@/components/AppText";
import {Link} from "expo-router";


export default function Login() {
    return (
        <View>
            <AppText>Login</AppText>
            <Link href="/auth/sign-up" asChild>
                <Text>Sign up</Text>
            </Link>
        </View>
    )
}