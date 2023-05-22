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
import Localization from "../localization/Localization";

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
			<View>
				<Text style={styles.mainText}>
					{Localization.authorization}
				</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder={Localization.enter_email}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<View style={styles.passwordContainer}>
					<TextInput
						style={styles.inputPassword}
						placeholder={Localization.enter_password}
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
					<Text style={styles.buttonText}>{Localization.login}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<Text onPress={() => navigation.replace("SignupScreen")}>
					{Localization.goToSignup}
				</Text>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFF",
	},
	mainText: {
		fontSize: 44,
		marginTop: 20,
		marginBottom: 230,
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#888",
		borderRadius: 8,
		paddingHorizontal: 18,
		marginBottom: 8,
		backgroundColor: "lightgrey",
		paddingVertical: 0,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#888",
		borderRadius: 8,
		paddingHorizontal: 6,
		backgroundColor: "lightgrey",
	},
	inputPassword: {
		flex: 1,
		height: 40,
		paddingHorizontal: 12,
		paddingVertical: 0,
	},
	buttonContainer: {
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	button: {
		backgroundColor: "#663399",
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
