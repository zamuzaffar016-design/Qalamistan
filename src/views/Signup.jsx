import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("🎉 Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>Join Qalamistan</h1>

        <p>
          Create your account and share your stories.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Create Account
        </button>

      </div>

    </div>

  );

}

export default Signup;