import React, { useState } from "react";
import Base from "../../Components/Base";
import { submitLicense } from "../../Services/user-service";

function EditNGO() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file to the first file selected
  };

  const data = localStorage.getItem("data");
  const data1 = JSON.parse(data);

  const id = data1.user?.organization_id;
  console.log(id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert(" Please select a file before submitting!");
      return;
    }

    submitLicense(file, id)
      .then((data) => {
        alert("License uploaded successfully!");
        console.log("Response:", data);
      })
      .catch((error) => {
        alert("Failed to upload license");
        console.error("Upload Error:", error);
      });
  };

  return (
    <>
      <Base />
      <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-6">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl text-mono font-bold mb-5">
            Edit NGO Information
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Update Phone Number"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="text"
                name="chairmanName"
                placeholder="Update Name of Chairman"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="text"
                name="ngoName"
                placeholder="Update Name of NGO"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="text"
                name="address"
                placeholder="Update Address of NGO"
                className="border-black p-2 rounded w-full bg-transparent text-black placeholder-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Update Email of NGO"
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
        </div>
        <div className="bg-transparent shadow-2xl rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl text-mono font-bold mb-5">
            SUBMIT YOUR LICENSE HERE
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input type="file" onChange={handleFileChange} />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 mt-[235px] text-black font-bold py-2 px-4 rounded"
            >
              GET NGO APPROVED
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditNGO;
