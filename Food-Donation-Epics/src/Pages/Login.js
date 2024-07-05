import React, { useState } from "react";
import Base from "../Components/Base";
import { login } from "../Services/user-service";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { doLogin } from "../Services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error.isError) {
      console.log("Invalid form data");
      return;
    }

    login(formData)
      .then((resp) => {
        console.log(resp);
        console.log("success log");

        //saving data to local storage
        doLogin(resp, () => {
          console.log("Login detail saved to local storage");
        });
        toast.success("SIGNED IN SUCCESSFULLY", {
          position: "bottom-center",
          className: "toast-message",
        });

        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in registering");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <>
      <Base />
      {/* <HomeBase /> */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-200">
        <div className="bg-transparent shadow-2xl rounded px-12 pt-8 pb-10 mb-4 w-full max-w-lg">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4">
              <span className="text-yellow-500 text-4xl">
                <IoMailOutline />
              </span>
            </div>
            <h2 className="text-center text-3xl font-semibold text-gray-700">
              NGO SIGN IN
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3" // Increased label size
                htmlFor="email"
              >
                Email ID
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMailOutline className="text-gray-400 text-lg" />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Increased padding in input
                  placeholder="Enter your email address"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3" // Increased label size
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Increased padding in input
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-yellow-600 hover:text-yellow-500 underline"
                  to="/registerNgo"
                >
                  REGISTER NGO
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline" // Increased button size
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            className="logs"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password :</label>
          <input
            style={{ width: "400px" }}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </form>
      </div> */}
    </>
  );
}
