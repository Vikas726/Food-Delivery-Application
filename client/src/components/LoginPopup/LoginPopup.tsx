import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

interface LoginPopupProps {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPopup:React.FC<LoginPopupProps> = ({setShowLogin}) => {

    const [currState,setCurrState]  = useState<string>('Login')

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
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
            <input type="text" placeholder="Your Name" required />
          )}

          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="password" required />
        </div>
        <button>
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