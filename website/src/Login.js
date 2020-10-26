import React from "react";

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
            <div className="username-text">Email-ID</div>
            <input
              type="text"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="username"
            />
            <p className="errorMsg">{emailError}</p>
            <div className="pass-text">Password</div>
            <input className="pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errorMsg">{passwordError}</p>
            <button type="button" onClick={handleLogin} name="log" className="log">
              LOGIN
            </button>
          </form>
      </div>
    </section>
  );
};

export default Login;
