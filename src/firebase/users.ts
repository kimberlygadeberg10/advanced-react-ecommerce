import { deleteUser, type User } from "firebase/auth";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./config";

export interface UserProfile {
    uid: string;
    email: string | null;
    name: string;
    address: string;
    createdAt?: string;
}

export async function getUserProfile(uid: string) {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
        throw new Error("User profile not found.");
    }

    return userDoc.data() as UserProfile;
}

export async function updateUserProfile(
    uid: string,
    data: { name: string; address: string },
) {
    await updateDoc(doc(db, "users", uid), data);
}

export async function deleteUserProfile(user: User) {
    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);
}

export function getCurrentUser() {
    return auth.currentUser;
}