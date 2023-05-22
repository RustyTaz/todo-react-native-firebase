import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoWorkScreen from "./screens/TodoWorkScreen";
import Localization from "./localization/Localization";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitle: Localization.app_name,
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
						color: "white",
					},
					headerStyle: {
						backgroundColor: "#663399",
					},
					headerLeft: null,
				}}
			>
				<Stack.Screen
					options={{ headerShown: true }}
					name="Login"
					component={LoginScreen}
				/>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					options={{ headerShown: true }}
					name="SignupScreen"
					component={SignupScreen}
				/>
				<Stack.Screen
					options={{ headerShown: true }}
					name="TodoWorkScreen"
					component={TodoWorkScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
