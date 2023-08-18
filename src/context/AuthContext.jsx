import { checkPermission, login, register } from "api/auth"
import { createContext, useContext, useState } from "react"
import * as jwt from 'jsonwebtoken'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register:null,
  login:null,
  logout:null
}
export const useAuth = () =>useContext(AuthContext)
const AuthContext = createContext(defaultAuthContext)

export const Authprovider = ({children})=>{
    const [isAuthentic, setAuthentic] = useState(false)
    const [payload, setpayload] = useState(null)
    const {pathname} = useLocation()

    useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setAuthentic(false);
        setpayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setAuthentic(true);
        const tempPayload = jwt.decode(authToken);
        setpayload(tempPayload)
      }else{
        setAuthentic(false);
        setpayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

    return(

        <AuthContext.Provider value={{
            isAuthentic, 
            currentMember:payload && {
              id:payload.sub,
              name:payload.name  
            },
            register: async(data)=>{
            const {success, authToken} = await register({
                username:data.username,
                password:data.password,
                email:data.email});
                const tempPayload = jwt.decode(authToken)
                if(tempPayload){
                    setpayload(tempPayload)
                    setAuthentic(true)
                    localStorage.setItem('authToken',authToken)
                }else{
                   setpayload(null)
                   setAuthentic(false) 
                }
                return success 
            },
            login: async(data)=>{
              const {success, authToken} = await login({
               username:data.username,
               password:data.password 
               }); 
               const tempPayload = jwt.decode(authToken)
                if(tempPayload){
                    setpayload(tempPayload)
                    setAuthentic(true)
                    localStorage.setItem('authToken',authToken)
                }else{
                   setpayload(null)
                   setAuthentic(false) 
                }
                return success
            },
            logout: ()=>{
             localStorage.removeItem('authToken');
             setpayload(null)
             setAuthentic(false)   
            }
            }}>
        {children}
        </AuthContext.Provider>
    )
}