import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../store/actions";

const LoginPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginBtn = () => {
    dispatch(login(data));
  };

  const history = useHistory();

  useEffect(() => {
    if (user.error) {
      window.alert(user.message);
    }

    if (user.name) {
      history.push("/dashboard");
    }
  }, [user.error]);

  return (
    <>
      <div className="form">
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
          value={data.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={data.password}
        />
        <button className="submit" onClick={loginBtn}>
          Login
        </button>
      </div>

      <style jsx>
        {`
          .form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            justify-content: center;
            align-items: center;
            height: 50vh;
            width: 300px;
            margin: auto;
          }

          .form > input {
            padding: 12px;
            font-size: 16px;
            width: 100%;
          }

          .submit {
            width: 200px;
            padding: 16px;
            background-color: black;
            color: white;
            border: none;
            width: 100%;
            font-size: 16px;
            text-transform: uppercase;
          }
        `}
      </style>
    </>
  );
};

export default LoginPage;
