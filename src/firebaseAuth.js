import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import './firebase'

/* Règles Authentification Firebase
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
*/


// https://firebase.google.com/docs/auth/web/manage-users
export function FirebaseCheck(isUser) {
  const subscribeAuth = getAuth().onAuthStateChanged(userCredential => {
    if (userCredential) {
      const user = userCredential.email;
      isUser(user)
    } else {
      isUser(null)
    }
  });
}

// https://firebase.google.com/docs/auth/web/password-auth
export function FirebaseSignIn(isError, email, password) {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    console.log("Utilisateur connecté: ", email)
    isError(null)
  })
  .catch((error) => {
    isError("Erreur de connexion: " + error.message)
  });
}

// https://firebase.google.com/docs/auth/web/password-auth
export function FirebaseSignOut(isError) {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("Déconnexion de l'utilisateur réussie")
    isError(null)
  }).catch((error) => {
    isError("Erreur de déconnexion: " + error.message)
  });
}
