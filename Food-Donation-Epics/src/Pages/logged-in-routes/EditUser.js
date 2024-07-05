import React, { useState } from "react";
import Base from "../../Components/Base";

function EditUser() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    chairmanName: "",
    ngoName: "",
    address: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if at least one field is filled out
    if (Object.values(formData).some((x) => x !== "")) {
      console.log("Form data:", formData);
      setFormSubmitted(true);
      // Here you would typically send the data to a server
    } else {
      alert("Please fill out at least one field.");
    }
  };

  return (
    <>
      <Base />
      <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-6">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl text-mono font-bold mb-5">
            Edit User Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Update Phone Number"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="text"
                name="firstName"
                value={formData.chairmanName}
                onChange={handleChange}
                placeholder="Update First Name"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              {/* <input
                type="text"
                name="ngoName"
                value={formData.ngoName}
                onChange={handleChange}
                placeholder="Update Name of NGO"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              /> */}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Update Address"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Update Email"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
            >
              Update Information
            </button>
          </form>
          {formSubmitted && (
            <p className="text-green-500 mt-3">
              Information updated successfully!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default EditUser;
