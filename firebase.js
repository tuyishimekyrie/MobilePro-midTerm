import { initializeApp } from "@firebase/app"; // Import initializeApp from the firebase/app module
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore, collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsZp9fHof3_U7SJsT29eNYMo7_H_YoV2Y",
  authDomain: "mobilequizapp-e9082.firebaseapp.com",
  projectId: "mobilequizapp-e9082",
  storageBucket: "mobilequizapp-e9082.appspot.com",
  messagingSenderId: "227339605623",
  appId: "1:227339605623:web:24c36b6316544e55765872",
};
// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
