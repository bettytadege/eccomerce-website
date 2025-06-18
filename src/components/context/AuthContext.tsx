/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "@/api/axiosInstance";
import { decodeJWT } from "@/utils/jwtUtils";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Products,User } from "../types/type";

type AuthData ={
  userData: User;
  setUserData: (data: any) => void;
  isLoggedIn: boolean;
  signIn: (token: string) => Promise<void>;
  signUp: (token: string) => void;
  
 
  productId:string,
  setProductId:(id:string)=>void
}


const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User |null>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 
  const [productId, setProductId] = useState<string>('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  // console.log('token from auth⭐⭐⭐',token)
  // console.log('productid from context✨✨',productId)

  const fetchUserData = async (token: string) => {
    const { userId, isValid } = decodeJWT(token);

    if (!isValid || !userId) {
      setIsLoggedIn(false);
      setUserData(null);
      return;
    }

    try {
      const res = await instance.get(`user/${userId}`);
      setUserData(res.data);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  const signIn = async (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signUp = async (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [isLoggedIn, token]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        signIn,
        signUp,
       
        productId,setProductId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
