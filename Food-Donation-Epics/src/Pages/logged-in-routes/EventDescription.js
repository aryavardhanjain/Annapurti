import React from "react";
import { useState } from "react";
import Base from "../../Components/Base";
import { useLocation } from "react-router-dom";
import { volunteerForEvent } from "../../Services/user-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EventDescription() {
  const location = useLocation();
  // console.log(location);
  const event = location.state;
  console.log(event);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const rawData = localStorage.getItem("data");
  let t = "";
  let role;
  // Check if rawData exists
  if (rawData) {
    // Parse the JSON string into an object
    const data = JSON.parse(rawData);

    // Access the token property
    const token = data.token;
    t = token;
    role = data?.user?.role; // Log or u
  } else {
    console.log("No data found in local storage.");
  }
  console.log(t);
  console.log(event?.event.id);

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    // Check for any pre-validation errors
    if (error.isError) {
      console.log("Invalid data");
      return;
    }

    // Attempt to volunteer for an event
    volunteerForEvent(event?.event.id, t)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        // Display success message
        toast.success("Successfully Volunteered", {
          position: "bottom-center",
          className: "toast-message",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error in volunteering", {
          position: "bottom-center",
          className: "toast-error",
        });
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  function formatDate(dateString) {
    // Parse the date from the string
    const [day, month, year] = dateString
      .split("-")
      .map((num) => parseInt(num, 10));

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const suffix = hours >= 12 ? "PM" : "AM";

    const hour12 = hours % 12 || 12;

    return `${hour12}:${minutes < 10 ? "0" + minutes : minutes} ${suffix}`;
  }

  const date = formatDate(event?.event.date);
  const time = formatTime(event?.event.time);

  return (
    <>
      <Base />
      <div className="bg-yellow-100 p-6 min-h-screen">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-semibold">{event?.event.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                <Link to={"/ngo/profile"} state={{ event: event }}>
                  {event?.event?.organization?.organization_name}
                </Link>
              </p>
              <h3 className="text-sm font-semibold">About the event</h3>
              <p className="text-sm text-gray-500">
                {event?.event.description}
              </p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0">
            <button className="bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-r">
              Report Event
            </button>
          </div>
        </div>
        <div className="bg-transparent shadow-2xl rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">NGO Contact Information</h3>
              <p>
                <strong>Phone:</strong>{" "}
                {event?.event?.organization?.user_details.phone_number}
              </p>
              <p>
                <strong>Address:</strong> 525 6th Street, New York, NY 10011
              </p>
              <p>
                <strong>Email:</strong> hello@jeremyrose.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Additional Information</h3>
              <p>
                <strong>Date Of Event: </strong>
                {date}
              </p>
              <p>
                <strong>Time Of Event: </strong> {time}
              </p>
              <p>
                <strong>Number Of Volunteers: </strong>{" "}
                {event?.event?.volunteer_count}
              </p>
            </div>
            {role != 1 && (
              <div>
                <button
                  className="ml-[1250px] bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-l"
                  onClick={handleSubmitEvent}
                >
                  Volunteer
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <div className="bg-white shadow rounded-lg p-6 mt-6">
    <h3 className="font-semibold text-lg">Work</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p>
          <strong>Spotify New York</strong>
        </p>
        <p>120 William Street, New York, NY 10038</p>
      </div>
      <div>
        <p>
          <strong>Metropolitan Museum</strong>
        </p>
        <p>525 6th Street, New York, NY 10011</p>
      </div>
    </div>
  </div> */}
      </div>
    </>
  );
}

export default EventDescription;
