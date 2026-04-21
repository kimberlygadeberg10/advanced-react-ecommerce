import type { FirebaseError } from "firebase/app";

export function getAuthErrorMessage(error: unknown) {
  const firebaseError = error as FirebaseError;

  switch (firebaseError.code) {
    case "auth/email-already-in-use":
      return "That email is already being used.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is not enabled in Firebase yet.";
    case "permission-denied":
    case "firestore/permission-denied":
      return "Firestore permissions are blocking registration.";
    case "auth/invalid-credential":
      return "The email or password is incorrect.";
    case "auth/user-not-found":
      return "No account was found with that email.";
    default:
      return firebaseError.message || "Something went wrong. Please try again.";
  }
}
