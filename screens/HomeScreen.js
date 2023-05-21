import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref, get, child } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";

const database = ref(getDatabase());
// set(ref(database, "Tasks/O6qKljPf7bbYt0OKpCNlfz4H1vx1"), {
// 	todo: "123",
// });
// console.log(getFirestore);

const auth = getAuth(app);

const db = getFirestore(app);

// getCities();

const HomeScreen = () => {
	const [todo, setTodo] = useState(""); // todo
	const [todos, setTodos] = useState([]); // todos"O6qKljPf7bbYt0OKpCNlfz4H1vx1"
	const navigation = useNavigation();

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

	const handleEditTodo = (index) => {
		// Handle edit logic here
	};

	const handleDeleteTodo = (index) => {
		// Handle delete logic here
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
			<View>
				<Text>Email: {getAuth().currentUser?.email}</Text>
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
		justifyContent: "space-around",
		// justifyContent: "space-around",
		alignItems: "center",
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
	container2: {
		padding: 16,
		backgroundColor: "#FFF",
		borderRadius: 8,
		marginBottom: 16,
		elevation: 2,
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
