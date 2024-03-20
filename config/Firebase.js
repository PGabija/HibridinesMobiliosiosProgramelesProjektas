import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUrpIH35qeu_IScd3V-1ppzeny2OMzZsY",
  authDomain: "skelbimai-login-register.firebaseapp.com",
  projectId: "skelbimai-login-register",
  storageBucket: "skelbimai-login-register.appspot.com",
  messagingSenderId: "165462196108",
  appId: "1:165462196108:web:bea9ce1a595763236be0a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (email, password, firstName, lastName, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });
    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName,
      lastName: lastName,
      email:email,
      phoneNumber: phoneNumber,
      password:password,
    });
    return user;
  } 
  catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed. Current user:", user);
});
export default auth;

const signOut = async () => {
  try {
    await auth.signOut();
  } 
  catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export { signUp, signOut };