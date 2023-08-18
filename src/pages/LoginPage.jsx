import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'context/AuthContext';

const LoginPage = () => {
const [username,setusername] = useState('')
const [password,setpassword] = useState('')
const navigate = useNavigate()
const {login, isAuthentic} = useAuth()


const handleClick = async() =>{
   if (username.length === 0) {
    return;
  }
  if (password.length === 0) {
    return;
  }

  const success = await login({
   username,
   password 
  });
  if(success){
     // 登入成功訊息
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      }); 
      return;
     
  }
       Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      }); 

}
useEffect(() => {
  if(isAuthentic){
    navigate('/todos')
  }
  }, [navigate, isAuthentic]);


  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

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
        type = 'password'
        label="密碼"
        placeholder="請輸入密碼"
        value={password}
        onChange={(passwordInputValue) =>setpassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to='/signup'>
      <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
