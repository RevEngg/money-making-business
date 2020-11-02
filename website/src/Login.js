import { TextField } from "@material-ui/core";
import React from "react";
import loginImage from "./images/4.png";
import Button from '@material-ui/core/Button';

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login-page">
      <div className="page">
          <form id="login" method="get" action="login.php" className="form">
            <div >
            <img src={loginImage} alt="this is car" className="image" />
            </div>
            <TextField id="uname" label="Email-Id" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
            <p className="errorMsg">{emailError}</p>
            <TextField id="pass" label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <p className="errorMsg">{passwordError}</p>
            <Button onClick={handleLogin} name="log" className="log" variant="contained"
            color="primary">
              LOGIN
            </Button>
          </form>
      </div>
    </section>
  );
};

export default Login;
