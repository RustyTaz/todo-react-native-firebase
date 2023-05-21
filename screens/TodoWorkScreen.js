import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { getDatabase, set, ref, get, child, update } from "firebase/database";
import { useNavigation } from "@react-navigation/core";

const database = ref(getDatabase());
const auth = getAuth(app);

const TodoWorkScreen = () => {
	const [todo, setTodo] = useState("");
	const navigation = useNavigation();

	function addTodo(todo) {
		const db = getDatabase();
		const userId = auth.currentUser.uid;
		const date = new Date().getTime();
		update(ref(db, `Tasks/` + userId), {
			[date]: todo,
		});
		setTodo("");
	}

	return (
		<View style={styles.container}>
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
					onChangeText={(text) => setTodo(text)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => addTodo(todo)}
				>
					<Text style={styles.buttonText}>ADD</Text>
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
