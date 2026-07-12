import { useState } from "react";
import { Link } from "react-router";
import { useRegister } from "@/shared/hooks/auth-query";

import styles from "./RegisterPage.module.scss";

export function RegisterPage() {
  const onRegister = useRegister();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    onRegister.mutate({ email: login, password });
    setLogin("");
    setPassword("");
  };

  return (
    <div className={styles.auth}>
      <div className={styles.card}>
        <input
          className={styles.input}
          type="text"
          placeholder="Create Login"
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

        <button
          type="submit"
          className={styles.button}
          onClick={handleRegister}
        >
          Create account
        </button>

        <Link className={styles.link} to="/auth/login">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
