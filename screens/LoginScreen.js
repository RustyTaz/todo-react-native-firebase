import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const auth = getAuth(app);
const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = getAuth().onAuthStateChanged((user) => {
			if (user) {
				navigation.replace("HomeScreen");
			}
		});

		return unsubscribe;
	}, []);

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log("Logged in with:", user.email);
			})
			.catch((error) => alert(error.message));
	};
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<View style={styles.passwordContainer}>
					<TextInput
						style={styles.input}
						placeholder="Password"
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={!showPassword}
					/>
					<TouchableOpacity
						onPress={toggleShowPassword}
						style={styles.iconContainer}
					>
						<MaterialIcons
							name={
								showPassword ? "visibility-off" : "visibility"
							}
							size={24}
							color="#888"
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<Text onPress={() => navigation.replace("SignupScreen")}>
					Don't have account? Registration!
				</Text>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#888",
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 8,
		backgroundColor: "lightgrey",
		// backgroundColor: "white",
		// paddingHorizontal: 15,
		// paddingVertical: 10,
		// borderRadius: 5,
		// marginTop: 10,
		// backgroundColor: "lightgrey",
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#888",
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	buttonContainer: {
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	button: {
		backgroundColor: "#6200ED",
		width: "100%",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonOutline: {
		backgroundColor: "white",
		marginTop: 5,
		borderColor: "#0782F9",
		borderWidth: 2,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 14,
	},
	iconContainer: {
		marginLeft: 8,
	},
});
