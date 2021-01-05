import React, { createContext, useContext, useEffect, useState } from 'react';
import {Autentication,googleAuthProvider,facebookAuthProvider,db,storageFirebase} from '../../FirestoreConfig'

// creacion del contexto
const MyContext = createContext()

// para usar exporatr el contexto y usar su valores en cualquier componente
export const useAuth = ()=> useContext(MyContext)

// para exportar la db de firebade y reutilizarla en los componentes
export const dataBase = db;

// para exportar storage y reutilizarla en los componentes
export const storageF = storageFirebase;


 export function AuthContext({children}) {
    //  variable donde estara los datos del usuario
    const [currenUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)
    // funcion que hace la peticion para registrar usuario
    const Registrar =(email,password)=>{
        return Autentication.createUserWithEmailAndPassword(email,password)
    }

    // funcion para ingresar 

    const Login =(email,password)=>{
        return Autentication.signInWithEmailAndPassword(email,password)
    }

    // funcion para salir de la cuenta

    const logout = () => Autentication.signOut()

    // funcion para el login con google
    const socialLoginGoogle = async ()=>{
       return await Autentication.signInWithPopup(googleAuthProvider)
    }

    // funcion para el login con facebook
    const socialLoginFacebook = async ()=>{
        return await Autentication.signInWithPopup(facebookAuthProvider)
     }

    //  funcion para restablecer contraseña usuario

    const ResetPass = async(email,actionCodeSettings)=>{
      return  await Autentication.sendPasswordResetEmail(email,actionCodeSettings)
    }

  
    
    // verificamos si existe un usuario y lo mandamos a un estado global
    useEffect(()=>{
       const unsuscribe  =  Autentication.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsuscribe
    },[])

    // objeto donde tiene los datos a usar en otros componentes hijos
    const value ={
        currenUser,
        Registrar,
        Login,
        logout,
        ResetPass,
        socialLoginFacebook,
        socialLoginGoogle
    }
    
    return (
       <MyContext.Provider value={value}>
           { !loading && children}
       </MyContext.Provider>
    );
}

