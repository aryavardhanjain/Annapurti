import React from "react";
import { GrFormEdit } from "react-icons/gr";
// Using react-icons for star ratings
import { Link } from "react-router-dom";
import Base from "../../Components/Base";
import { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../Services/auth";

function UserDashboard() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userDetails = getCurrentUserDetail();
    setUser(userDetails);
  }, []);

  return (
    <>
      <Base />
      <div className="bg-yellow-100 p-6 min-h-screen">
        <div className="bg-transparent shadow-2xl rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-48 w-48 rounded-full mr-4"
              src="/defaultUser.png"
              alt="Jeremy Rose"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {user ? user.first_name + " " + user.last_name : "User"}
              </h2>
              {/* <p className="text-sm text-gray-500">Product Designer</p>
              <p className="text-sm text-gray-500">New York, NY</p> */}
            </div>
          </div>
          {/* <div className="flex mt-4 md:mt-0">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-l">
              <Link to="/user/rate">Rate User</Link>
            </button>
            <button className="bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-r">
              <Link to="/user/report">Report User</Link>
            </button>
          </div> */}
        </div>
        <div className="bg-transparent shadow-2xl rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <p>
                <strong>Phone:</strong>{" "}
                {user
                  ? user.phone_number
                    ? user.phone_number
                    : "8178227498"
                  : "9310143440"}
              </p>
              <p>
                <strong>Address:</strong>
                {user
                  ? user.address
                    ? user.address
                    : "525 6th Street, New York, NY 10011"
                  : "525 6th Street, New York, NY 10011"}
              </p>
              <p>
                <strong>Email:</strong> {user ? user.email : "none"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Additional Information</h3>
              <p>
                <strong>Birthday:</strong> June 5, 1992
              </p>
              <p>
                <strong>Gender:</strong> Male
              </p>
            </div>
            <div className="ml-[90vw] mt-0">
              <Link to="/user/edit">
                <GrFormEdit className="h-[60px] w-[30px]" />
              </Link>
            </div>
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

export default UserDashboard;
