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
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addDisplayItem } from "../redux/slices/displayItemsSlice";
import { updateUser, removeUserData } from "../redux/slices/userDataSlice";
import { setAllOrders } from "../redux/slices/allOrdersSlice";
import { addMyorderData } from "../redux/slices/myOrdersSlice";

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

function getCurrentDate() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthName = monthNames[monthIndex];
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${day} ${monthName} ${year}`;
  return formattedDate;
}
const currentDate = getCurrentDate();
// console.log(currentDate); // output: "12 March 2023"

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  // const items = useSelector((state) => state.items);
  // console.log("osm", items);

  const [user, setUser] = useState(null);
  // const [myOrders, setMyOrders] = useState([]);
  //
  useEffect(() => {
    if (user !== null) {
      dispatch(updateUser(user));
      // dispatch(addMyorderData(myOrders));
      getMyOrdersDetails();
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    fetchItems();
    GetAllOrders();
  }, [user]);

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(removeUserData());
      setUser(null);
      console.log("User signed out successfully");
      alert("Signed out");
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

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

  const signinUserWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(updateUser(user));
        console.log(dispatch);
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

      console.log("Profile updated!", updateProfile);
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
        qty: 1,
        status: "waiting for approved",
        itemPhoto: uploadResult,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
        .then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          alert("Upload Succesfully, Refresh to se changes");
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
      dispatch(addDisplayItem(items));

      // console.log("Items fetched:", items);
      // console.log("Items dispatched:", items);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const GetAllOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "AllOrders"));
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push(doc.data());
      });
      dispatch(setAllOrders(ordersData));

      console.log("Items fetched:", ordersData);
      console.log("Items dispatched:", ordersData);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const deleteItemData = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, "shoes", itemId));
      // console.log("Item deleted successfully!");
      alert("Item Deletes");
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const placeOrder = async (items, subTotal, total) => {
    try {
      const docRef = await addDoc(collection(firestore, "AllOrders"), {
        items,
        subTotal: subTotal || 0,
        total: total || 0,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        Date: currentDate || 0,
        status: "pending",
      });
      await updateDoc(docRef, { orderId: docRef.id });
      console.log("Document written with ID: ", docRef.id);
      alert("Your Order Placed Successfully");
      console.log("Order Placed");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while placing your order.");
    }
  };

  const orderState = async (id, state) => {
    let docRef;
    docRef = doc(firestore, "AllOrders", id);
    await updateDoc(docRef, {
      status: state,
    });
    alert("Status Changed");
  };

  const getMyOrdersDetails = async () => {
    const q = query(
      collection(db, "AllOrders"),
      where("userEmail", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    const myOrders = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      myOrders.push(doc.data());
    });

    // setMyOrders(myOrders);
    await dispatch(addMyorderData(myOrders));
  };

  const isLoggedIn = !!user;
  return (
    <FirebaseContext.Provider
      value={{
        signOut,
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        updateProfileData,
        addItemData,
        fetchItems,
        deleteItemData,
        placeOrder,
        orderState,
        getMyOrdersDetails,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
