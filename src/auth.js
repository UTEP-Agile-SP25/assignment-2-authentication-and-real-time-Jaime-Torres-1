import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi_vAvUzJquFJq1zigpShiO_oviMau52w",
    authDomain: "torres-sandbox.firebaseapp.com",
    projectId: "torres-sandbox",
    storageBucket: "torres-sandbox.appspot.com",
    messagingSenderId: "488386833014",
    appId: "1:488386833014:web:c63afaf2468d1d60954d57",
    measurementId: "G-HKBB79S0VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), { email: user.email });

        window.location.href = "profile.html";
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert("This email is already in use. Please try a different email.");
        } else {
            console.error("Error creating user:", error);
            alert("An error occurred. Please try again.");
        }
    }
};

export const signInUser = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "profile.html";
    } catch (error) {
        console.error("Error signing in:", error);
        alert("Unable to sign in. Please check your email and password.");
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html"; // Redirect to sign-up/sign-in page
    } catch (error) {
        console.error("Error signing out:", error);
        alert("An error occurred while signing out. Please try again.");
    }
};