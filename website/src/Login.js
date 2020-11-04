import { TextField } from "@material-ui/core";
import React from "react";
import loginImage from "./images/4.png";
import Button from '@material-ui/core/Button';
import {
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
  },
})(TextField);

const theme = createMuiTheme({
  palette: {
      type:'dark',
    },
});

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
            <img src={loginImage} alt="logo will be added here" className="image" />
            </div>
            <ThemeProvider theme={theme}>
            <CssTextField id="uname" label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
            <p className="errorMsg">{emailError}</p>
            <CssTextField id="pass" label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <p className="errorMsg">{passwordError}</p>
            <Button onClick={handleLogin} name="log" className="log" variant="contained"
            color="primary">
              LOGIN
            </Button>
            </ThemeProvider>
          </form>
      </div>
    </section>
  );
};

export default Login;
