import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import styles from "./LoginPage.module.scss";

function Login() {
  const { logIn } = useAuth();
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleLogIn = () => {
    if (value.trim() === "admin") logIn();
  };

  return (
    <div className={styles.login}>
      <input type="text" placeholder="login" onChange={onChange} value={value} />

      <button type="button" onClick={handleLogIn}>
        login
      </button>
      <Link to="/auth/register">register</Link>
    </div>
  );
}

export default Login;
