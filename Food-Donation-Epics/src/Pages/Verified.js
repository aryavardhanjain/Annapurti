import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isVerified } from "../Services/user-service";

function Verified() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [verificationStatus, setVerificationStatus] = useState("pending");

  useEffect(() => {
    let verificationInterval;

    const verifyAccount = async () => {
      try {
        const response = await isVerified(email);
        if (response.data === true) {
          setVerificationStatus("verified");
          clearInterval(verificationInterval);
          navigate("/userLogin");
        } else {
          setVerificationStatus("unverified");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setVerificationStatus("error");
      }
    };

    verifyAccount();

    verificationInterval = setInterval(() => {
      verifyAccount();
    }, 5000); // Adjust interval duration as needed

    return () => {
      clearInterval(verificationInterval);
    };
  }, [email, navigate]);

  return (
    <div>
      {verificationStatus === "pending" && (
        <p>Please wait, verifying your account...</p>
      )}
      {verificationStatus === "unverified" && (
        <p>Your account is not yet verified. Please wait or contact support.</p>
      )}
      {verificationStatus === "error" && (
        <p>There was an error verifying your account.</p>
      )}
    </div>
  );
}

export default Verified;
