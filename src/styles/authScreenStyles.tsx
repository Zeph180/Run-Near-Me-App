import { StyleSheet } from "react-native";

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
    // backgroundColor: "#fff",
    // backgroundColor: "rgba(190, 255, 0, 0.25)",
    borderRadius: 13,
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
