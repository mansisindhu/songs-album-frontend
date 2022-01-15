import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../store/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(getUser({}));
  };

  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          Albums
        </Link>

        {user.name ? (
          <Link className="link" to="/dashboard">
            Dashboard
          </Link>
        ) : null}

        {user.name ? (
          <p onClick={onLogout} className="link">
            Logout
          </p>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </div>
      <style jsx>
        {`
          .navbar {
            display: flex;
            background-color: black;
            padding: 16px 24px;
            justify-content: space-between;
          }

          .link {
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
