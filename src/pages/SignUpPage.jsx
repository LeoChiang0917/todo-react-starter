import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'context/AuthContext';




const SignUpPage = () => {
const [username,setusername] = useState('')
const [email,setemail] = useState('')
const [password,setpassword] = useState('')
const navigate = useNavigate()
const {register, isAuthentic} = useAuth()

const handleClick = async() =>{
   if (username.length === 0) {
    return;
  }
  if (password.length === 0) {
    return;
  }if(email.length===0){
    return;
  }

const success = await register({username,password,email});
if(success){
     
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      }); 
      
     return;
  }
 Swal.fire({
        position: 'top',
        title: '註冊失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      }); 


}
useEffect(() =>{
if(isAuthentic){
  navigate('/todos')
}

},[navigate, isAuthentic])
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput 
        label="帳號"
        placeholder="請輸入帳號"
        value={username}
        onChange={(nameInputValue) =>setusername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput 
        type = 'email'
        label="信箱"
        placeholder="請輸入信箱"
        value={email}
        onChange={(passwordInputValue) =>setemail(passwordInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput 
        type = 'password'
        label="密碼"
        placeholder="請輸入密碼"
        value={password}
        onChange={(passwordInputValue) =>setpassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
      <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
