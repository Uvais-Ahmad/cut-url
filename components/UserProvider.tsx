"use client"
import { handleGetME } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext(null);

export const UserProvider =  ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        const response = await handleGetME();
        if(response.status === 200) {
            console.log("res : ",response?.data)
            setUser(response.data.data);
        }
    }
    
    useEffect(() => {
        fetchUser();
    },[]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);