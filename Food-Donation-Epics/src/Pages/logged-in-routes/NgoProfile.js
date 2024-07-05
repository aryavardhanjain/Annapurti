import React from "react";
import { FaStar } from "react-icons/fa";
import { GrFormEdit } from "react-icons/gr";
// Using react-icons for star ratings
import Base from "../../Components/Base";
import { Link } from "react-router-dom";
import { getCurrentUserDetail } from "../../Services/auth";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import { useLocation } from "react-router-dom";
import { getRatingsByOrganization } from "../../Services/user-service";

function NgoProfile() {
  // Outputs: "May 5th, 2024"

  const location = useLocation();
  // console.log(location);
  const event = location.state;
  console.log(event);
  //   console.log(event?.event?.event);

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const organizationName =
      event?.event?.event?.organization.organization_name; // Set the organization name as needed
    getRatingsByOrganization(organizationName)
      .then((response) => {
        setRatings(response.data); // Assuming the API returns the array of ratings directly
      })
      .catch((error) => {
        console.error("Failed to fetch ratings:", error);
      });
  }, []);

  console.log(ratings);

  const formatDate = (dateStr) => {
    if (!dateStr) return ""; // Check if the date string is there
    const date = parseISO(dateStr);
    return format(date, "MMMM do, yyyy");
  };

  const dateStr = event
    ? event?.event?.event?.organization.created_at
    : "2024-05-05T10:12:11.782928Z";

  const date1 = formatDate(dateStr);

  const calculateAverage = () => {
    if (ratings.length === 0) return 0; // Check if the ratings array is empty
    const total = ratings.reduce((acc, item) => acc + item.rating, 0); // Sum up all ratings
    return (total / ratings.length).toFixed(1); // Calculate the average and fix to one decimal place
  };

  const average = calculateAverage();

  return (
    <>
      <Base />
      {/* <HomeBase /> */}
      <div className="bg-yellow-100 p-6 min-h-screen">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                {event?.event?.event?.organization.organization_name}
              </h2>
              <div className="flex mt-1">
                <span className="text-gray-600 ml-2">
                  Rating : {average} out of 5
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-l">
              <Link
                to={"/ngo/rate"}
                state={{
                  id: event?.event?.event?.organization.id,
                }}
              >
                Rate NGO
              </Link>
            </button>
            <button className="bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-r">
              <Link to="/ngo/report">Report NGO</Link>
            </button>
          </div>
        </div>
        <div className="bg-transparent shadow-2xl rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">NGO Contact Information</h3>
              <p>
                <strong>Phone:</strong>{" "}
                {event?.event?.event?.organization.user_details.phone_number}{" "}
              </p>
              <p>
                <strong>Name of Chairman:</strong>{" "}
                {event?.event?.event?.organization.chairman_name}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {event?.event?.event?.organization.registered_address}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {event?.event?.event?.organization.user_details.email}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-[10px]">
                Additional Information
              </h3>
              <p>
                <strong>JOINED ON:</strong> {date1}
              </p>
            </div>
          </div>
        </div>
        <h1 className="mt-[50px] font-bold text-mono">COMMENTS</h1>

        <div className="bg-transparent shadow-2xl rounded-lg p-6 items-start md:items-center justify-between">
          {ratings.map((e) => (
            <Comments text={e.description} key={e.id} />
          ))}
        </div>
      </div>
    </>
  );
}

const Comments = ({ text }) => {
  return (
    <p className="text-sm font-semibold shadow-md w-full p-3 text-gray-500 mb-[10px] ">
      {text}
    </p>
  );
};

export default NgoProfile;
