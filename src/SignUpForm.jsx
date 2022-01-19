import React from "react";
import { useState } from "react";

function SignUpForm({setErrors}) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmpwd: "",
    email: "",
  });

  const handleChange = (ev) =>
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  const options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(process.env.REACT_APP_API_URL + "api/signup/", {
      ...options,
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        const json = res.json();
        if (res.ok) {
          setErrors({})
          return json
        }
        else {
          return json.then((err) => {
            const errors = { errors: err, status: res.status }
            setErrors(errors)
            return errors
          });
        }
      })
      .then((json) => console.log(json));
    console.log(credentials);
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
        </label> <br />
        <label>
          email
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={credentials.email}
            id=""
          />
        </label> <br />
        <label>
          password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={credentials.password}
            id=""
          />
        </label> <br />
        <label>
          password confirm
          <input
            onChange={handleChange}
            type="password"
            name="confirmpwd"
            value={credentials.confirmpwd}
            id=""
          />
        </label> <br />
        <button>submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
