import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "@/shared/hooks/auth-query";

import styles from "./LoginPage.module.scss";

function Login() {
  const onLogin = useLogin();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onLogin.mutate({ email: login, password });
  };

  return (
    <form className={styles.auth} onSubmit={handleSubmit}>
      <div className={styles.card}>
        <input
          className={styles.input}
          type="text"
          placeholder="Login"
          onChange={onChangeLogin}
          value={login}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
          value={password}
        />

        <button type="submit" className={styles.button}>
          LogIn
        </button>

        <Link className={styles.link} to="/auth/register">
          into to register
        </Link>
      </div>
    </form>
  );
}

export default Login;
