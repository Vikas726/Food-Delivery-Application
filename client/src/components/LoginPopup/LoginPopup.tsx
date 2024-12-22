import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContextType, StoreContext } from "../../context/StoreContext";
import axios from 'axios'

interface LoginPopupProps {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
    name: string;
    email: string;
    password: string;
}

const LoginPopup:React.FC<LoginPopupProps> = ({setShowLogin}) => {

    const [currState,setCurrState]  = useState<string>('Login')

    const {url,setToken} = useContext<StoreContextType>(StoreContext)

    const [data,setData] = useState<Data>({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setData({...data,[name]:value})
    }

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(data);

      try {
        let response;

        if (currState === "Login") {
          response = await axios.post(`${url}/api/user/login`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          response = await axios.post(`${url}/api/user/register`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        console.log(response.data);
        console.log(response.data.success);
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          setShowLogin(false)
        }else{
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input type="text" name='name' value={data.name} onChange={handleChange} placeholder="Your Name" required />
          )}

          <input type="email" name='email' value={data.email} onChange={handleChange} placeholder="Your email" required />
          <input type="password" name='password' value={data.password} onChange={handleChange} placeholder="password" required />
        </div>
        <button type='submit'>
          {currState === "Sign Up" ? "Create an account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the use of terms & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p onClick={() => setCurrState("Sign Up")}>
            Don't have an account ?<span>Sign Up</span>
          </p>
        ) : (
          <p onClick={() => setCurrState("Login")}>
            Already have an account ?<span>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup