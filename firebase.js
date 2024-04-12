import { initializeApp } from "@firebase/app"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence,setPersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDsZp9fHof3_U7SJsT29eNYMo7_H_YoV2Y",
  authDomain: "mobilequizapp-e9082.firebaseapp.com",
  projectId: "mobilequizapp-e9082",
  storageBucket: "mobilequizapp-e9082.appspot.com",
  messagingSenderId: "227339605623",
  appId: "1:227339605623:web:24c36b6316544e55765872",
};
export const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// export const auth = initializeAuth(app);

// Enable persistence using AsyncStorage
// setPersistence(auth, getReactNativePersistence(AsyncStorage));
// Enable persistence using AsyncStorage
// setPersistence(auth, getReactNativePersistence(() => AsyncStorage));
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const firestore = getFirestore(app);

export const db = getFirestore(app);
