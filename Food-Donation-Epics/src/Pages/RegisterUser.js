import Base from "../Components/Base";
import React, { useState } from "react";
import { userSignup } from "../Services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPhonePortraitSharp,
} from "react-icons/io5";

function RegisterUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
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

    userSignup(formData)
      .then((resp) => {
        console.log(resp);
        console.log("success log");

        toast.success("Please activate your account through your mail", {
          position: "bottom-center",
          className: "toast-message",
        });

        navigate("/verification", { state: { email: formData.email } });
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        });
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-200">
        <div className="bg-transparent shadow-2xl rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-lg">
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-center text-3xl font-semibold text-gray-700">
              Create Account
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-between items-center w-full">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block  text-gray-700 text-lg font-bold mb-3"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block  text-gray-700 text-lg font-bold mb-3"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <IoPhonePortraitSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block  text-gray-700 text-lg font-bold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block  text-gray-700 text-lg font-bold mb-3"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className="shadow appearance-none border rounded w-full py-3 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-grey-700 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default RegisterUser;
