import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
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
  apiKey: "AIzaSyB9nJvme-n_QGOoZ1O0UHRRXebBZTv4l_E",
  authDomain: "moxie-d1975.firebaseapp.com",
  projectId: "moxie-d1975",
  storageBucket: "moxie-d1975.appspot.com",
  messagingSenderId: "535050169054",
  appId: "1:535050169054:web:d0c97f0c7a61b520b7304f",
  measurementId: "G-RW0D5BMV1F",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  console.log(user);
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((e) => {
        alert("SIGN IN SUCCES");
        console.log(e);
      })
      .catch((error) => {
        // alert("Error");
        console.log(error);
      });
  };
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) => {
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

  const updateProfileData = async (fullName, address, photo) => {
    try {
      const imageRef = await ref(
        storage,
        `uploads/user/${Date.now()}-${photo.name}`
      );
      console.log("Image reference:", imageRef);

      // Upload the photo to the storage location
      await uploadBytes(imageRef, photo);

      // Get the download URL for the uploaded photo
      const photoURL = await getDownloadURL(imageRef);

      // Update the user's profile with the new data
      await updateProfile(firebaseAuth.currentUser, {
        displayName: fullName,
        photoURL: photoURL,
        // phoneNumber: phone,
        address: address,
      });

      console.log("Profile updated!");
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const addItemData = async (name, desc, price, category, photo) => {
    try {
      const imageRef = await ref(
        storage,
        `uploads/allItems/images${Date.now()}-${photo.name}`
      );
      console.log("Image reference:", imageRef);

      // Upload the photo to the storage location
      await uploadBytes(imageRef, photo);

      // Get the download URL for the uploaded photo
      const uploadResult = await getDownloadURL(imageRef);

      console.log("Photo URL:", uploadResult);

      // Add Items to the storage
      await addDoc(collection(firestore, "shoes"), {
        name,
        desc,
        price,
        category,
        itemPhoto: uploadResult,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      console.log("Items Added!");
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "shoes"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log("Items fetched:", items);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  fetchItems()

  const isLoggedIn = !!user;
  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        updateProfileData,
        addItemData,
        fetchItems,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
