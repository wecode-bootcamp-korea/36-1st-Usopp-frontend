import { useState } from 'react';
import SignUp from './SignMode/SignUp';
import SignIn from './SignMode/SignIn';
import './Login.scss';

const Login = ({ toglleCart }) => {
  const [signMode, setSignMode] = useState('sign');
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
  });

  const [checkBox, setCheckBox] = useState({ first: false, second: false });

  const signDisabled =
    inputValue.email.includes('@') &&
    inputValue.email.includes('.com') &&
    inputValue.email.length >= 5;

  const signUpDisabled =
    signDisabled &&
    inputValue.password.length >= 8 &&
    inputValue.firstName.length >= 1 &&
    inputValue.lastName.length >= 1;

  const signBtnColor = signDisabled ? '#333' : '#cecccc';

  const signUpBtnColor = signUpDisabled ? '#333' : '#cecccc';

  const checked = e => {
    const { name } = e.target;
    setCheckBox({ ...checkBox, [name]: !checkBox[name] });
  };

  const saveInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const signIn = () =>
    signMode === 'signIn' ? setSignMode('signUp') : setSignMode('signIn');

  const confirm = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:3000/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputValue.email,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw alert('response is not ok ');
      })
      .then(data => {
        if (data.message === 'EMAIL_NOT_EXISTS') {
          setSignMode('signUp');
        } else if (data.message === 'EMAIL_DUPLICATE') {
          setSignMode('signIn');
        }
      });
  };

  const goToSignIn = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:3000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then(response => response.json())
      .then(data =>
        data.accessToken
          ? localStorage.setItem('Token', data.Token)
          : alert('잘못된 회원 정보입니다.')
      );
  };

  const goToSignUP = e => {
    e.preventDefault();

    if (inputValue.password === inputValue.passwordConfirm) {
      if (checkBox.first === true && checkBox.second === true) {
        fetch('http://127.0.0.1:3000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: inputValue.email,
            password: inputValue.password,
            firstName: inputValue.firstName,
            lsatName: inputValue.lastName,
          }),
        })
          .then(response => response.json())
          .then(data =>
            data.message === 'OK'
              ? setSignMode('sign')
              : alert('정성껏 입력하세요')
          );
      } else {
        alert('약관 동의가 필요합니다.');
      }
    } else {
      alert('패스워드가 일치하지 않습니다.');
    }
  };

  const showSign = {
    sign: (
      <SignIn
        sign={SIGN.sign}
        inputValue={inputValue}
        saveInput={saveInput}
        goToSignIn={confirm}
        signDisabled={signDisabled}
        signBtnColor={signBtnColor}
      />
    ),
    signIn: (
      <SignIn
        sign={SIGN.signIn}
        inputValue={inputValue}
        saveInput={saveInput}
        goToSignIn={goToSignIn}
        signDisabled={signDisabled}
        signBtnColor={signBtnColor}
        signIn={signIn}
      />
    ),
    signUp: (
      <SignUp
        sign={SIGN.signUp}
        inputValue={inputValue}
        saveInput={saveInput}
        checkBox={checkBox}
        checked={checked}
        goToSignUP={goToSignUP}
        signUpDisabled={signUpDisabled}
        signUpBtnColor={signUpBtnColor}
        signIn={signIn}
      />
    ),
  };

  return (
    <div className="modalWindow">
      <div className="modal">
        <div className="iconPositon">
          <form method="get">
            <div className="modalTop">
              <h2 className="modalTitle">안녕하세요.</h2>
              <div className="modalSub">
                로그인 및 회원가입을 위한 이메일 주소를 입력 부탁드립니다.
              </div>
            </div>
            {showSign[signMode]}
          </form>
          <i className="fi fi-br-cross" onClick={toglleCart} />
        </div>
      </div>
    </div>
  );
};

export default Login;

const SIGN = {
  sign: [{ text: '이메일 주소', name: 'email' }],
  signIn: [
    { text: '이메일 주소', name: 'email' },
    { text: '패스워드', name: 'password' },
  ],
  signUp: [
    { text: '이메일 주소', name: 'email' },
    { text: '패스워드', name: 'password' },
    { text: '패스워드 확인', name: 'passwordConfirm' },
  ],
};
