import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref, get, child, remove } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";

const database = ref(getDatabase());
const auth = getAuth(app);
const db = getDatabase(app);

// getCities();

const HomeScreen = () => {
	const [todo, setTodo] = useState(""); // todo
	const [todos, setTodos] = useState([]); // todos"O6qKljPf7bbYt0OKpCNlfz4H1vx1"
	const navigation = useNavigation();
	const userId = auth.currentUser.uid;

	// const todoRef = collection(db, "Tasks");
	//console.log(todoRef);

	useEffect(() => {
		const userId = auth.currentUser.uid;
		let array = [];
		get(child(database, `Tasks/${userId}`)).then((snapshot) => {
			if (snapshot.exists()) {
				array = snapshot.val();
				setTodos(snapshot.val());
				console.log(array);
			} else {
				console.log("No data available");
			}
		});
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

	const handleEditTodo = (index) => {
		// Handle edit logic here
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
					onPress={() => navigation.replace("TodoWorkScreen")}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Add todo</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignOut} style={styles.button}>
					<Text style={styles.buttonText}>Sign out</Text>
				</TouchableOpacity>
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
			<View style={styles.buttonContainer}></View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// alignItems: "center",
		padding: 16,
		backgroundColor: "#FFF",
		borderRadius: 8,
		marginBottom: 16,
		elevation: 2,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		// justifyContent: "space-around",
		alignItems: "center",
		marginBottom: 50,
	},
	button: {
		// backgroundColor: "#0782F9",
		// width: "60%",
		// padding: 15,
		// borderRadius: 10,
		// alignItems: "center",
		// marginTop: 40,
		padding: 8,
		backgroundColor: "#663399",
		borderRadius: 4,
	},

	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	todoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
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
