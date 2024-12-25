import { Link } from "react-router-dom";
import user_logo from "../assets/user.png";
import logo from "../assets/group-study-logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "./ThemeProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`w-11/12 mx-auto ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="navbar shadow-sm px-4">
        <div className="flex-1">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" src={logo} alt="GroupStudy Logo" />
            <span className="font-bold text-lg">GroupStudy</span>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded hidden lg:block ${
            theme === "dark"
              ? "bg-yellow-500 text-gray-800"
              : "bg-blue-500 text-white"
          }`}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <div className="hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/assignments">Assignments</Link>
            </li>
            <li>
              <Link to={`/pending-assignments/${user?.email}`}>Pending Assignments</Link>
            </li>
            {!user && (
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
            )}
          </ul>

          {/* Conditional User Dropdown */}
          {user && (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                title={user?.displayName || "User"}
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL || user_logo}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-base-100 text-gray-800"
                }`}
              >
                <li>
                  <Link to="/create-assignments" className="justify-between">
                    Create Assignments
                  </Link>
                </li>
                <li>
                  <Link to={`/submissions/${user?.email}`}>
                    My Attempted Assignments
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={logOut}
                    className={`block text-center ${
                      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title={user?.name || "User"}
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL || user_logo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-base-100 text-gray-800"
              }`}
            >
              <li>
                <Link to="/assignments">Assignments</Link>
              </li>
              <li>
                <Link to={`/pending-assignments/${user?.email}`}>Pending Assignments</Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link to="/create-assignments" className="justify-between">
                      Create Assignments
                    </Link>
                  </li>
                  <li>
                    <Link to={`/submissions/${user?.email}`}>
                      My Attempted Assignments
                    </Link>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={logOut}
                      className={`block text-center ${
                        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
