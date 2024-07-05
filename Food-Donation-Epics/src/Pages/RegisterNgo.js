import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import Base from "../Components/Base";
import { signup } from "../Services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterNgo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization_name: "",
    registered_address: "",
    chairman_name: "",
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

    signup(formData)
      .then((resp) => {
        console.log(resp);
        console.log("success log");

        toast.success("Please activate your account through your mail", {
          position: "bottom-center",
          className: "toast-message",
        });

        navigate("/verification", { state: { email: formData.email } });
        setFormData({
          organization_name: "",
          registered_address: "",
          chairman_name: "",
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
      <div className=" min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-200">
        <div className="bg-transparent shadow-2xl rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-lg">
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-center text-3xl font-semibold text-gray-700">
              NGO Registration
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-lg font-bold mb-3"
                  htmlFor="ngoName"
                >
                  Name of NGO
                </label>
                <input
                  type="text"
                  id="organization_name"
                  name="organization_name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter NGO's name"
                  value={formData.organization_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-lg font-bold mb-3"
                  htmlFor="chairmanName"
                >
                  Name of Chairman
                </label>
                <input
                  type="text"
                  id="chairman_name"
                  name="chairman_name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter chairman's name"
                  value={formData.chairman_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="phone"
                id="phone_number"
                name="phone_number"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email address"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="address"
              >
                Registered Address
              </label>
              <textarea
                id="registered_address"
                name="registered_address"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter registered address"
                value={formData.registered_address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>

            {/* <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-3"
                htmlFor="verification"
              >
                Verification (Attach File)
              </label>
              <input
                type="file"
                id="verification"
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div> */}

            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
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

export default RegisterNgo;
