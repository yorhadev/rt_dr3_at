import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9WpsHAnCrK_S61oUzbK5mLBRPZuL4yW4",
  authDomain: "rt-dr3-at.firebaseapp.com",
  projectId: "rt-dr3-at",
  storageBucket: "rt-dr3-at.appspot.com",
  messagingSenderId: "805884631879",
  appId: "1:805884631879:web:30dfff308ce71be5100a62",
};

class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = initializeAuth(this.app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

  async createUser(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      return {
        status: 200,
        message: "user created successfully!",
        data: user,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        status: 200,
        message: "user signed in successfully!",
        data: user,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }
}

const firebaseService = new FirebaseService();

export default firebaseService;
