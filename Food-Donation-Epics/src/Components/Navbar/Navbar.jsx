import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doLogout,
  getCurrentUserDetail,
  isLoggedIn,
} from "../../Services/auth";
import { BsBellFill } from "react-icons/bs";
import { LiaCheckCircle } from "react-icons/lia";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  // Close the modal when clicking anywhere on the page
  const closeModal = () => setIsOpen(false);

  const handleDropdown = (id) => {
    const dropdown = document.getElementById(id);
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      dropdown.classList.add("block");
    } else {
      dropdown.classList.add("hidden");
      dropdown.classList.remove("block");
    }
  };

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      toast.success("Logged Out", {
        position: "bottom-center",
        className: "toast-message",
      });
      navigate("/");
    });
  };

  return (
    <nav className="bg-orange-300 flex justify-between items-center py-2 px-8 text-gray-700 shadow-lg">
      <div className="flex items-center">
        <ul className="flex list-none pl-10 pr-10 font-bold">
          {!login && (
            <>
              <li className="mr-6">
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <a
                  href="https://dashboard.tribal.gov.in/ngo.aspx"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
            </>
          )}
          {login && (
            <>
              <div className="relative inline-block">
                <li
                  onClick={() => handleDropdown("login-register-dropdown")}
                  className="font-bold text-black hover:text-orange-500 transition-colors duration-200"
                >
                  <Link to="/" className="no-underline mr-[10px]">
                    Home
                  </Link>
                </li>
                <div
                  id="login-register-dropdown"
                  className="absolute z-10 hidden bg-orange-300 rounded-md shadow-md"
                >
                  <a
                    href="#login"
                    className="block px-4  text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
                  >
                    Bank details
                  </a>
                  <a
                    href="#login"
                    className="block px-4  text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
                  >
                    Update Bank details
                  </a>
                  <a
                    href="#login"
                    className="block px-4  text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
                  >
                    View
                  </a>
                  <Link
                    to="/ngo/application"
                    className="block px-4  text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
                  >
                    Application Form
                  </Link>
                </div>
              </div>
              <a
                className="ml-2 text-black font-bold mr-[20px] hover:text-orange-500 transition-colors duration-200"
                href="https://dashboard.tribal.gov.in/ngo.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Dashboard
              </a>
              <li className="font-bold hover:text-orange-500 mr-[20px] transition-colors duration-200">
                <Link
                  className="text-black  hover:text-orange-500 no-underline"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="font-bold hover:text-orange-500 transition-colors duration-200">
                <Link
                  className="text-black no-underline hover:text-orange-500"
                  to="/event/maps"
                >
                  Events
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex items-center z-10">
        {login && (
          <>
            {/* <button onClick={() => handleDropdown("notification-dropdown")}>
              <BsBellFill className="text-black hover:text-orange-500 transition-colors duration-200 mr-[30px] relative inline-block" />
            </button>
            <div
              id="notification-dropdown"
              className="relative z-10 hidden mt-[150px] bg-orange-300 rounded-md shadow-md"
            >
              Thank
            </div> */}
            <button onClick={toggleModal}>
              <BsBellFill className="text-black hover:text-orange-500 transition-colors duration-200 mr-8 relative inline-block" />
            </button>
            {isOpen && (
              <div
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-green-50 p-6 rounded-lg shadow-lg"
                >
                  <h4 className="text-lg font-bold mb-4">Notifications</h4>
                  <p className="shadow-xl flex align-middle">
                    <LiaCheckCircle className="mr-[10px]" /> Thank You For
                    Registering.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={logout}
              className="font-bold text-black hover:text-orange-500 transition-colors duration-200"
            >
              Logout
            </button>
            <h3 className="font-bold pl-4 text-black hover:text-orange-500">
              {user?.role === 2 ? (
                <Link className="mr-[50px]" to="/user/dashboard">
                  Welcome, {user ? user.username : "User"}
                </Link>
              ) : (
                <Link className="mr-[50px]" to="/ngo/dashboard">
                  Welcome,{" "}
                  {user ? user.organization?.organization_name : "User"}
                </Link>
              )}
              {/* Welcome, {user ? user.name : "User"} */}
            </h3>
          </>
        )}
        {!login && (
          <div className="relative inline-block">
            <button
              onClick={() => handleDropdown("login-register-dropdown")}
              className="font-bold hover:text-orange-500 mr-8 transition-colors duration-200"
            >
              Login / Register
            </button>
            <div
              id="login-register-dropdown"
              className="absolute z-10 hidden bg-orange-300 rounded-md shadow-md"
            >
              <Link
                className="block px-4 py-2 text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
                to="/userLogin"
              >
                FOR USER
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-black font-semibold no-underline hover:bg-orange-400 transition-colors duration-200"
              >
                FOR NGO
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
