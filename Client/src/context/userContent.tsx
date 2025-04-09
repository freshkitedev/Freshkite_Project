'use client';
import { createContext, ReactNode, useContext, useState } from "react";


interface IUser {
    name: string,
    email: string,
    profile: string,
    token?: string
    role: string
}

interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}