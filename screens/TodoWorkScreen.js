import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { getDatabase, set, ref, get, child, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/core";

const database = ref(getDatabase());
const auth = getAuth(app);

const TodoWorkScreen = () => {
	const [todo, setTodo] = useState("");
	const navigation = useNavigation();
	const route = useRoute();
	const { editMode } = route.params || false;
	const { todoId, todoValue } = route.params || {};

	useEffect(() => {
		if (editMode && todoValue) {
			setTodo(todoValue);
		}
	}, [editMode, todoValue]);

	function addTodo() {
		const db = getDatabase();
		const userId = auth.currentUser.uid;
		const date = new Date().getTime();
		update(ref(db, `Tasks/` + userId), {
			[date]: todo,
		});
		setTodo("");
	}

	function editTodo() {
		const db = getDatabase();
		const userId = auth.currentUser.uid;
		const todoRef = ref(db, `Tasks/${userId}/${todoId}`);
		set(todoRef, todo)
			.then(() => {
				console.log("Todo updated successfully.");
				//navigation.goBack();
			})
			.catch((error) => {
				console.error("Error updating todo:", error);
			});
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.mainText}>
					{editMode ? "Edit todo" : "Create todo"}
				</Text>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.replace("HomeScreen")}
			>
				<Text style={styles.buttonText}>GO BACK</Text>
			</TouchableOpacity>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Add new todo..."
					style={styles.input}
					value={todo}
					onChangeText={(text) => setTodo(text)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={editMode ? editTodo : addTodo}
				>
					<Text style={styles.buttonText}>
						{editMode ? "SAVE" : "ADD"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TodoWorkScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	mainText: {
		fontSize: 34,
		marginTop: 20,
		marginBottom: 50,
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 20,
	},
	button: {
		backgroundColor: "#6200ED",
		width: "60%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
});
