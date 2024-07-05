import React from "react";
import { FaStar } from "react-icons/fa";
import { GrFormEdit } from "react-icons/gr";
// Using react-icons for star ratings
import Base from "../../Components/Base";
import { Link } from "react-router-dom";
import { getCurrentUserDetail } from "../../Services/auth";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

function NgoDashboard() {
  // Outputs: "May 5th, 2024"

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return ""; // Check if the date string is there
    const date = parseISO(dateStr);
    return format(date, "MMMM do, yyyy");
  };

  const dateStr = user
    ? user.organization_created_at
    : "2024-05-05T10:12:11.782928Z";

  const date1 = formatDate(dateStr);
  return (
    <>
      <Base />
      {/* <HomeBase /> */}
      <div className="bg-yellow-100 p-6 min-h-screen">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                {user ? user.organization?.organization_name : "NGO"}
              </h2>
              <div className="flex mt-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <span className="text-gray-600 ml-2">8.6</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent shadow-2xl rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">NGO Contact Information</h3>
              <p>
                <strong>Phone:</strong>{" "}
                {user ? user?.phone_number : "8343493294"}
              </p>
              <p>
                <strong>Name of Chairman:</strong>{" "}
                {user ? user?.chairman_name : "ABC"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {user ? user?.organization.registered_address : "abc"}
              </p>
              <p>
                <strong>Email:</strong> {user ? user?.email : "abc"}
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
            <div className="ml-[90vw] mt-0">
              <Link to="/ngo/edit">
                <GrFormEdit className="h-[60px] w-[30px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NgoDashboard;
