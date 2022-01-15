import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          Albums
        </Link>

        <Link className="link" to="/login">
          Login
        </Link>
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
