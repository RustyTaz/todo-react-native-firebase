// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCMYCZ061XvqBa64MHTUUnmh98INTOEl4c",
	authDomain: "my-application-48ea2.firebaseapp.com",
	databaseURL: "https://my-application-48ea2-default-rtdb.firebaseio.com",
	projectId: "my-application-48ea2",
	storageBucket: "my-application-48ea2.appspot.com",
	messagingSenderId: "316337652637",
	appId: "1:316337652637:web:8a0c500fcfb240c223a574",
	measurementId: "G-38BPHCHMXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

export default app;
