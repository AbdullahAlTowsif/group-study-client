import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Footer top section with links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="font-bold text-lg">GroupStudy</h2>
            <p className="mt-2 text-sm">
              A platform for students to collaborate, complete assignments, and grade each other&apos;s work. Learn and grow together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg">Quick Links</h2>
            <ul className="mt-2">
              <li>
                <a
                  href="/assignments"
                  className={`text-sm hover:${
                    theme === "dark" ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  Assignments
                </a>
              </li>
              <li>
                <a
                  href="/pendingAssignments"
                  className={`text-sm hover:${
                    theme === "dark" ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  Pending Assignments
                </a>
              </li>
              <li>
                <a
                  href="/create-assignments"
                  className={`text-sm hover:${
                    theme === "dark" ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  Create Assignments
                </a>
              </li>
              <li>
                <a
                  href="/my-attempted-assignments"
                  className={`text-sm hover:${
                    theme === "dark" ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  My Attempted Assignments
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="font-bold text-lg">Follow Us</h2>
            <div className="mt-2 flex space-x-4">
              <a
                href="#"
                className={`text-xl hover:${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className={`text-xl hover:${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className={`text-xl hover:${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className={`text-xl hover:${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-bold text-lg">Contact</h2>
            <ul className="mt-2">
              <li className="text-sm">Email: support@groupstudy.com</li>
              <li className="text-sm">Phone: +1 (123) 456-7890</li>
              <li className="text-sm">Address: 123 Study St, Knowledge City</li>
            </ul>
          </div>
        </div>

        {/* Footer bottom section with copyright */}
        <div
          className={`mt-8 border-t pt-4 text-center ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p className="text-sm">&copy; 2024 GroupStudy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
