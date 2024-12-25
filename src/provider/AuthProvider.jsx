import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const authInfo = {
        user,
        createNewUser,
        userLogin,
        googleSignIn,
        provider,
        setUser,
        logOut,
        updateUserProfile,
        loading,
        setLoading
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
          console.log('CurrentUser-->', currentUser)
          if (currentUser?.email) {
            setUser(currentUser)
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                {
                    email: currentUser?.email,
                },
                {withCredentials: true}
            )
            console.log(data)
          } else {
            setUser(currentUser)
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/logOut`,
                {withCredentials: true}
            )
          }
          setLoading(false)
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