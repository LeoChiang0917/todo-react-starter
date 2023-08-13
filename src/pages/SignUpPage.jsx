import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';

const SignUpPage = () => {
const [username,setusername] = useState('')
const [email,setemail] = useState('')
const [password,setpassword] = useState('')
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
      <AuthButton>註冊</AuthButton>
      <AuthLinkText>取消</AuthLinkText>
    </AuthContainer>
  );
};

export default SignUpPage;
