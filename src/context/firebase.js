import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyA2rQngmKRUGCfiN4TE26avmrn_z2qie3Q",
    authDomain: "moxie-73775.firebaseapp.com",
    projectId: "moxie-73775",
    storageBucket: "moxie-73775.appspot.com",
    messagingSenderId: "143385364412",
    appId: "1:143385364412:web:7596df8b403b1098f4cdb9",
    measurementId: "G-F6VET0XG8K"
};


export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
// const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);



export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);
    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
            .then((e) => {
                alert("SIGN IN SUCCES");
                console.log(e)
            })
            .catch((error) => {
                // alert("Error");
                console.log(error);
            });
    };
    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);



    const signinUserWithEmailAndPassword = (email, password) => {
        // signInWithEmailAndPassword(firebaseApp, email, password);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    // updateProfile(firebaseAuth.currentUser, {
    //     displayName: fullName, photoURL: photoUrl
    // }).then(() => {
    //     // Profile updated!
    //     // ...
    // }).catch((error) => {
    //     // An error occurred
    //     // ...
    // });
    const isLoggedIn = !!user;
    return (
        <FirebaseContext.Provider
            value={{
                signinWithGoogle, signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, isLoggedIn
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}