import { createContext, useContext, useEffect, useState } from "react";


const AuthContext=createContext(null)
export function AuthProvider({children}){
    const[user,setUser]=useState(null);
    
    
    useEffect(()=>{
        const storedUser=localStorage.getItem('user');  
        const token=localStorage.getItem('token');
        if(storedUser && token){
            setUser (JSON.parse(storedUser));
        }   
    
    },[])
    const login=(userData)=>{
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData));
        localStorage.setItem('token',userData.token);
        localStorage.setItem('role',userData.role);
        localStorage.setItem('department',userData.department_id);
    }
    
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('department');
    setUser(null);
    user===null&&Navigate('/login');
    
    

    
    
  };
  return(
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )

}
export function useAuth() {
  return useContext(AuthContext);
}
