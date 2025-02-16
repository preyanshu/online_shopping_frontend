import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";


function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if(json.success){

      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/");
    }
    else{
      alert("Invalid Credentials")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  //Google login function
  const googleLogin = async () => {

    const {email, password} = credentials;

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content_Type": "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/");
    }
    else{
      alert("Invalid Credentials")
    }
  };

  //password hide show 
      const [showPassword, setShowPassword] = React.useState(false);

      const handleClickShowPassword = () => {
          setShowPassword(!showPassword);
      };

  return (
    <>
    <h3 className="lheading">Login to your Account</h3>
    <div className="container forml">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            // placeholder="Enter your email"
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="exampleInputPassword1"
            name="password"
            endAdornment={
              <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                  >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
              </InputAdornment>
            }
            // placeholder="Enter your password"
          />
        </div>
         <span><b>Does not have any account ? </b></span>
        <Link className="btn btn-outline-success" to="/signup">Signup</Link>

        <hr className="hr"/>
        <div className="my-3 glbtn">
          <GoogleOAuthProvider clientId="941301008462-jo0o7bo3865igightks3cqi3v952776b.apps.googleusercontent.com">
          <GoogleLogin
                onSuccess={credentialResponse => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  credentials.email = decoded.email;
                  credentials.password = decoded.sub;
                  googleLogin();
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        <button type="submit" className="btn btn-success btn1">
          Login
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;

