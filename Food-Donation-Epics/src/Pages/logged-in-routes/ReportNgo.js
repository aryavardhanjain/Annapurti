import { useState } from "react";
import React from "react";
import Base from "../../Components/Base";
import HomeBase from "../HomeBase";

function ReportNgo() {
  // const [reportReason, setReportReason] = useState("");

  const handleReport = (type) => {
    // Here you would typically handle the report submission,
    // For example, sending it to a backend server
  };

  return (
    <>
      <Base />
      <HomeBase />
      <div className="min-h-[50vh]  bg-yellow-100 flex items-center justify-center">
        <div className="bg-yellow-200 p-6 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Report NGO</h2>
          <div className="flex justify-between space-x-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleReport("Fake")}
            >
              Fake
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleReport("Spam")}
            >
              Spam
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportNgo;
