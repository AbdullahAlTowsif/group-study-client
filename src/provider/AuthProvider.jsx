import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createNewUser = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = (email, password) => {
        // setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        // setLoading(true)
        return signInWithPopup(auth, provider)
    }


    const logOut = () => {
        // setLoading(true)
        return signOut(auth);
    }


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // const updateUserProfile = async (updatedData) => {
    //     // setLoading(true);
    //     try {
    //         await updateProfile(auth.currentUser, updatedData);
    //         setUser((prevUser) => ({
    //             ...prevUser,
    //             ...updatedData,
    //         }));
    //         // setLoading(false);
    //     } catch (error) {
    //         console.error("Error updating profile:", error);
    //         // setLoading(false);
    //     }
    // };

    const authInfo = {
        user,
        createNewUser,
        userLogin,
        googleSignIn,
        provider,
        setUser,
        logOut,
        updateUserProfile,
        // loading,
    }


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //             setUser({
    //                 uid: currentUser.uid,
    //                 email: currentUser.email,
    //                 name: currentUser.displayName,
    //                 photoURL: currentUser.photoURL || "",
    //             });
    //         } else {
    //             setUser(null);
    //         }
    //         // setLoading(false);
    //     });

    //     return () => unsubscribe();
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
          console.log('CurrentUser-->', currentUser)
          if (currentUser?.email) {
            setUser(currentUser)
          } else {
            setUser(currentUser)
          }
        //   setLoading(false)
        })
        return () => {
          return unsubscribe()
        }
      }, [])



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;