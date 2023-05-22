import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { getAuth } from "firebase/auth";
import app from "../firebase";
import { getDatabase, set, ref, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/core";
import Localization from "../localization/Localization";

const auth = getAuth(app);

const TodoWorkScreen = () => {
	const [todo, setTodo] = useState("");
	const navigation = useNavigation();
	const route = useRoute();
	const { editMode } = route.params || false;
	const { todoId, todoValue } = route.params || {};
	console.log(editMode);

	useEffect(() => {
		if (editMode && todoValue) {
			setTodo(todoValue);
		}
	}, [editMode, todoValue]);

	function addTodo() {
		const db = getDatabase();
		const userId = auth.currentUser.uid;
		const date = new Date().getTime();
		update(ref(db, `Tasks/${userId}`), { [date]: todo });
		setTodo("");
	}

	function editTodo() {
		const db = getDatabase();
		const userId = auth.currentUser.uid;
		const todoRef = ref(db, `Tasks/${userId}/${todoId}`);
		set(todoRef, todo)
			.then(() => {
				console.log("Todo updated successfully.");
			})
			.catch((error) => {
				console.error("Error updating todo:", error);
			});
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.replace("HomeScreen")}
			>
				<Text style={styles.buttonText}>{Localization.back_btn}</Text>
			</TouchableOpacity>
			<View style={styles.contentContainer}>
				<Text style={styles.mainText}>
					{editMode
						? Localization.edit_todo
						: Localization.create_task}
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder={Localization.todo_input_placeholder}
						style={styles.input}
						value={todo}
						onChangeText={(text) => setTodo(text)}
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={editMode ? editTodo : addTodo}
					>
						<Text style={styles.buttonText}>
							{editMode
								? Localization.save_btn
								: Localization.add_todo_btn}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default TodoWorkScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	backButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
		backgroundColor: "#663399",
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	contentContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 20,
		marginTop: 50,
	},
	mainText: {
		fontSize: 34,
		textAlign: "center",
	},
	inputContainer: {
		width: "100%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 4,
		marginTop: 20,
		backgroundColor: "lightgrey",
	},
	button: {
		alignSelf: "center",
		backgroundColor: "#663399",
		width: "40%",
		padding: 10,
		borderRadius: 4,
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 14,
	},
});
