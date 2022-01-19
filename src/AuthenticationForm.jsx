import React from "react";
import { useState } from "react";
import { apiLogin } from "./api/api";
import setStateOrErrors from "./tools";

function AuthenticationForm({ setErrors, setToken }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (ev) =>
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await apiLogin("api/token/", credentials);
    console.log("submit response:", response);

    // setStateOrErrors(response, storeTokens, setErrors);
    // console.log(await refreshToken());
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>
          username
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={credentials.username}
            id=""
          />
        </label>{" "}
        <br />
        <label>
          password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={credentials.password}
            id=""
          />
        </label>
        <button>submit</button>
        <br />
      </form>
    </div>
  );
}

export default AuthenticationForm;
