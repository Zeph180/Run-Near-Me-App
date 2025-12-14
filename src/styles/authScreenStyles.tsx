import { StyleSheet } from "react-native";
import colors from "@/Constants/Colors";

export const authScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyBoardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 13,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 73,
    height: 73,
    marginBottom: 10,
    backgroundColor: colors.offWhite,
    borderRadius: 13,
  },
  logoImage: {
    width: "96%",
    height: "80%",
  },
  orText: {
    color: "#ffffff",
    fontSize: 16,
  },
  signupText: {
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "96%",
    marginTop: 10,
    borderRadius: 13,
  },
  signUpLink: {
    color: "#9ACD32",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
