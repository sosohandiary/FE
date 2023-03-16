import axios from "axios";
import React, { useState } from "react";
import { CgKey } from "react-icons/cg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      name: name,
      password: password,
    };
    console.log(userInfo);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/join`, userInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={signupHandler}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
