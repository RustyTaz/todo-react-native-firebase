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
} from "firebase/auth";
import app from "../firebase";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const auth = getAuth(app);

const SignupScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigation = useNavigation();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		const unsubscribe = getAuth().onAuthStateChanged((user) => {
			if (user) {
				navigation.replace("HomeScreen");
			}
		});

		return unsubscribe;
	}, []);

	const handleSignUp = () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log("Registered with:", user.email);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View>
				<Text style={styles.mainText}>Registration</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>
				<View style={styles.passwordContainer}>
					<TextInput
						style={styles.inputPassword}
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
				<View style={styles.passwordContainer}>
					<TextInput
						style={styles.inputPassword}
						placeholder="Confirm password"
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
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
				<TouchableOpacity
					onPress={handleSignUp}
					style={[styles.button]}
				>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonContainer}>
				<Text onPress={() => navigation.replace("Login")}>
					Already have account? Login!
				</Text>
			</View>
		</KeyboardAvoidingView>
	);
};

export default SignupScreen;

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
		marginBottom: 5,
		backgroundColor: "lightgrey",
		paddingVertical: 0,
	},
	passwordContainer: {
		marginTop: 10,
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
		paddingVertical: 0, // Remove vertical padding
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
