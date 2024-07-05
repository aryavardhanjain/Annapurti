import { useState } from "react";
import React from "react";
import Base from "../../Components/Base";
import HomeBase from "../HomeBase";
import { useLocation } from "react-router-dom";
import { ratingFn } from "../../Services/user-service";

function RateNgo() {
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const a = id.id;
  console.log(a);

  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  let t = "";
  const rawData = localStorage.getItem("data");
  if (rawData) {
    // Parse the JSON string into an object
    const data = JSON.parse(rawData);

    // Access the token property
    const token = data.token;
    t = token; // Log or u
  } else {
    console.log("No data found in local storage.");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "rating") {
      setRating(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Here you would typically handle the submission, like sending data to a server
    ratingFn(rating, description, a, t)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        setRating("");
        setDescription("");
        // Handle successful submission, e.g., notifying the user or updating the state
      })
      .catch((error) => {
        console.error("Submission failed", error);
        alert("Submission failed", error);
        // Handle errors, e.g., showing error messages to the user
      });
    // Reset the form if needed
  };
  return (
    <>
      <Base />
      <HomeBase />
      <div className="min-h-[50vh] bg-yellow-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="min-h-[50vh] bg-yellow-100 flex items-center justify-center"
        >
          <div className="bg-yellow-200 p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">RATE NGO</h2>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-bold text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={rating}
                onChange={handleChange}
              >
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-bold text-gray-700"
              >
                Comments
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Comments for NGO"
                className="border border-gray-300 p-2 w-full rounded mb-4"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RateNgo;
