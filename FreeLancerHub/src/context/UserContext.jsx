import { createContext, useContext, useEffect, useState } from "react";

export const userContext=createContext();

export const useUserContext=()=>{
    return useContext(userContext);
}


export const UserProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const savedUser=localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null
    });

    const value={
        user,
        setUser
    }
    useEffect(() => {
        // Store user data in local storage whenever it changes
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
};

