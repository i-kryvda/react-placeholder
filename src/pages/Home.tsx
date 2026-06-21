import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@test.com",
        password: "123456",
      }),
    })
      .then((r) => r.json())
      .then(console.log);
  }, []);

  return <div>Home page</div>;
}
