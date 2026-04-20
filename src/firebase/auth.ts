import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

export async function registerUser(
    email: string,
    password: string,
) {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: "",
        createdAt: new Date().toISOString(),
    });

    return userCredential.user;
}

export async function loginUser(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
    );

    return userCredential.user;
}

export async function logoutUser() {
    await signOut(auth);
}