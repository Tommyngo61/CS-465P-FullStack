import React, { useContext, useState, useEffect } from 'react'
import firebase from '../firebaseDB/firebase'

const auth = firebase.auth();
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const db = firebase.firestore();

    function signup(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({
                restaurants: [],
                username: username,
                bio: "Default Bio."
            })
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}