import { Link } from "react-router-dom";
import user_logo from "../assets/user.png";
import logo from "../assets/group-study-logo.jpg";

const Navbar = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="flex-1">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" src={logo} alt="GroupStudy Logo" />
            <span className="font-bold text-lg">GroupStudy</span>
          </Link>
        </div>

        {/* Desktop Navbar - Full Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/assignments">Assignments</Link>
            </li>
            <li>
              <Link to="/pendingAssignments">Pending Assignments</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          {/* User Dropdown Menu */}
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title="User Profile" className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user_logo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/create-assignments" className="justify-between">
                  Create Assignments
                </Link>
              </li>
              <li>
                <Link to="/my-attempted-assignments">
                  My Attempted Assignments
                </Link>
              </li>
              <li className="mt-2">
                <button className="bg-gray-200 block text-center">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Small Device Specific - Assignments and Pending Assignments inside the dropdown */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title="User Profile" className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user_logo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Mobile Links Inside User Dropdown */}
              <li>
                <Link to="/assignments">Assignments</Link>
              </li>
              <li>
                <Link to="/pendingAssignments">Pending Assignments</Link>
              </li>
              <li>
                <Link to="/create-assignments" className="justify-between">
                  Create Assignments
                </Link>
              </li>
              <li>
                <Link to="/my-attempted-assignments">
                  My Attempted Assignments
                </Link>
              </li>
              <li className="mt-2">
                <button className="bg-gray-200 block text-center">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
