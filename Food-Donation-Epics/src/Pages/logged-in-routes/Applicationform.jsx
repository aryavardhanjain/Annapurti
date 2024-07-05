// ApplicationForm.jsx
import Base from "../../Components/Base";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ApplicationForm = () => {
  const [field, setField] = useState("");
  const [subField, setSubField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Decide the route based on the selected fields
    let route = "/";
    if (field === "healthcare") {
      route =
        subField === "10-bedded"
          ? "/ngo/application/health/bedded"
          : "/ngo/application/health/dispensary";
    } else if (field === "education") {
      route =
        subField === "hostel"
          ? "/education/hostel-form"
          : "/education/school-form";
    } else if (field === "livelihood") {
      route = "/livelihood-form";
    }

    // Redirect to the determined route
    navigate(route);
  };

  return (
    <>
      <Base />
      <div className="application">
        <form onSubmit={handleSubmit}>
          <label>
            Sector:
            <select value={field} onChange={(e) => setField(e.target.value)}>
              <option value="">Select Sector</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="livelihood">Livelihood</option>
            </select>
          </label>
          <br />
          {field === "healthcare" && (
            <label>
              Nature:
              <select
                value={subField}
                onChange={(e) => setSubField(e.target.value)}
              >
                <option value="">Select Nature</option>
                <option value="10-bedded">10 Bedded</option>
                <option value="dispensary">Dispensary</option>
              </select>
            </label>
          )}
          {field === "education" && (
            <label>
              Subfield:
              <select
                value={subField}
                onChange={(e) => setSubField(e.target.value)}
              >
                <option value="">Select Subfield</option>
                <option value="hostel">Hostel</option>
                <option value="school">School</option>
              </select>
            </label>
          )}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ApplicationForm;
