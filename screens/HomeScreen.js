import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { getDatabase, ref, get, child, remove } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import Localization from "../localization/Localization";

const database = ref(getDatabase());
const auth = getAuth(app);
const db = getDatabase(app);

const HomeScreen = () => {
	const [todos, setTodos] = useState([]);
	const navigation = useNavigation();
	const userId = auth.currentUser.uid;
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);
	const apiKey = "AIzaSyA5L8eQN-45j9APKtqY8hgDAdwa-WE4JWw";

	useEffect(() => {
		const userId = auth.currentUser.uid;
		let array = [];
		get(child(database, `Tasks/${userId}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					array = snapshot.val();
					setTodos(snapshot.val());
					console.log(array);
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error("Error fetching todos:", error);
			});

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);

			try {
				let response = await axios.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`
				);
				if (response.data.results && response.data.results.length > 0) {
					setAddress(response.data.results[0].formatted_address);
				} else {
					setAddress("Address not found");
				}
			} catch (error) {
				console.error("Error retrieving address:", error);
				setAddress("Error retrieving address");
			}
		})();
	}, []);

	const deleteTodo = (todoId) => {
		console.log(userId);
		console.log(todoId);
		const todoRef = ref(db, `Tasks/${userId}/${todoId}`);
		remove(todoRef)
			.then(() => {
				console.log("Todo deleted successfully.");
				setTodos((prevTodos) => {
					const updatedTodos = { ...prevTodos };
					delete updatedTodos[todoId];
					return updatedTodos;
				});
			})
			.catch((error) => {
				console.error("Error deleting todo:", error);
			});
	};

	const handleEditTodo = (todoId) => {
		navigation.navigate("TodoWorkScreen", {
			editMode: true,
			todoId: todoId,
			todoValue: todos[todoId],
		});
	};

	const handleDeleteTodo = (todoId) => {
		deleteTodo(todoId);
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("TodoWorkScreen")}
					style={styles.button}
				>
					<Text style={styles.buttonText}>
						{Localization.add_todo_btn}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignOut} style={styles.button}>
					<Text style={styles.buttonText}>
						{Localization.signout}
					</Text>
				</TouchableOpacity>
			</View>
			<View>
				{location && (
					<Text>
						Latitude: {location.coords.latitude.toFixed(6)},
						Longitude: {location.coords.longitude.toFixed(6)}
					</Text>
				)}
				{address && <Text>Address: {address}</Text>}
			</View>
			<View style={styles.container2}>
				{Object.entries(todos).map(([key, value]) => (
					<View key={key} style={styles.todoContainer}>
						<Text style={styles.todoText}>{value}</Text>
						<TouchableOpacity
							onPress={() => handleEditTodo(key)}
							style={styles.buttonIcon}
						>
							<MaterialIcons name="edit" size={24} color="#333" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleDeleteTodo(key)}
							style={styles.buttonIcon}
						>
							<MaterialIcons
								name="delete"
								size={24}
								color="red"
							/>
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#FFF",
		borderRadius: 8,
		marginBottom: 16,
		elevation: 2,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 30,
	},
	button: {
		padding: 8,
		backgroundColor: "#663399",
		borderRadius: 4,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	container2: {
		flex: 1,
		marginTop: 20,
	},

	todoContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		backgroundColor: "#FFF",
		padding: 8,
		borderRadius: 4,
		elevation: 2,
	},
	todoText: {
		flex: 1,
		fontSize: 16,
		marginLeft: 8,
	},
	buttonIcon: {
		padding: 8,
	},
});
