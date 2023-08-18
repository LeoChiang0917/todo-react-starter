import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
const navigate = useNavigate() 
const {isAuthentic} = useAuth()

useEffect(() => {
  if(isAuthentic){
    navigate('/todos')
  }else{
    navigate('/login')
  }
  }, [navigate, isAuthentic]); 
};

export default HomePage;
