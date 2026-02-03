import { Navigate } from "react-router-dom"

export default function PublicRoute(){
    const token=localStorage.getItem('token')
    const role=localStorage.getItem('role')
    if(token && role){
        return <Navigate to='/' replace />

    }
    return children 
}