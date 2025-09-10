import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AuthPage.css";

const BASE_URL = "https://hpclsparesportal.in/jyotisika_test/User_Api_Controller";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Extra fields for signup
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("male");
  const [userDob, setUserDob] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Send OTP
  const handleGetOtp = async () => {
    if (!mobile) {
      setStatus("danger");
      setMessage("Please enter mobile number");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("mobile_number", mobile);
      if (isSignup) {
        formData.append("action", "signin");
      }

      const res = await axios.post(`${BASE_URL}/sendOtpmobile`, formData);

      if (res.data.status === "success") {
        setOtpSent(true);
        setStatus("success");
        setMessage("OTP sent successfully!");
      } else {
        setStatus("danger");
        setMessage("Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setStatus("danger");
      setMessage("Error sending OTP");
    }
  };

  // 🔹 Verify OTP (Login flow)
  const handleVerifyOtp = async () => {
    if (!otp) {
      setStatus("warning");
      setMessage("Please enter OTP");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mobile_number", mobile);
      formData.append("otp", otp);

      const res = await axios.post(`${BASE_URL}/VerifyOtp`, formData);

      if (res.data.status === "success") {
        setStatus("success");
        setMessage("Login Successful ✅");

        // Save session
//localStorage.setItem("user_id", res.data.user_id);
//localStorage.setItem("mobile_number", mobile);
sessionStorage.setItem("user_id", JSON.stringify(res.data.user_id));
        sessionStorage.setItem(
          "mobile_number",
          JSON.stringify(res.data.mobile_number)
        );
      } else {
        setStatus("danger");
        setMessage("Invalid OTP ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("danger");
      setMessage("Error verifying OTP");
    }
  };

  // 🔹 Register new user after OTP
  const handleRegisterUser = async () => {
    if (!otp || !userName || !userDob) {
      setStatus("warning");
      setMessage("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mobile_number", mobile);
      formData.append("otp", otp);
      formData.append("user_name", userName);
      formData.append("user_gender", userGender);
      formData.append("user_dob", userDob);

      const res = await axios.post(`${BASE_URL}/reg_user`, formData);

      if (res.data.status === "success") {
        setStatus("success");
        setMessage("Signup Successful 🎉");

        // Save session
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("mobile_number", mobile);
      } else {
        setStatus("danger");
        setMessage(res.data.message || "Signup failed ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("danger");
      setMessage("Error during signup");
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="min-vh-100">
        {/* Left Side */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-start px-5 auth-left">
          <h2 className="fw-bold mb-4">
            Why {isSignup ? "Sign Up?" : "Log In?"}
          </h2>
          <ul className="list-unstyled fs-5">
            <li>✔ Get personalized information</li>
            <li>✔ Save charts (Kundli) on cloud</li>
            <li>✔ Write notes & comments</li>
            <li>✔ Access anywhere: mobile & web</li>
          </ul>
        </Col>

        {/* Right Side */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-light">
          <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "380px" }}>
            <Card.Body>
              <h3 className="text-center mb-4">
                {isSignup ? "Sign Up" : "Login"} to Continue
              </h3>

              {/* STEP 1: Mobile input */}
              {!otpSent && (
                <Form>
                  <Form.Group controlId="mobile" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="warning" className="w-100 fw-bold" onClick={handleGetOtp}>
                    Get OTP
                  </Button>
                </Form>
              )}

              {/* STEP 2: OTP + Extra fields for signup */}
              {otpSent && (
                <Form>
                  <Form.Group controlId="otp" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>

                  {isSignup ? (
                    <>
                      <Form.Group controlId="name" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter Full Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="gender" className="mb-3">
                        <Form.Select value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="dob" className="mb-3">
                        <Form.Control
                          type="date"
                          value={userDob}
                          onChange={(e) => setUserDob(e.target.value)}
                        />
                      </Form.Group>

                      <Button variant="primary" className="w-100 fw-bold" onClick={handleRegisterUser}>
                        Complete Signup
                      </Button>
                    </>
                  ) : (
                    <Button variant="success" className="w-100 fw-bold" onClick={handleVerifyOtp}>
                      Verify OTP
                    </Button>
                  )}
                </Form>
              )}

              {message && (
                <Alert variant={status} className="mt-3 text-center">
                  {message}
                </Alert>
              )}

              {/* Toggle Login / Signup */}
              <p className="text-center mt-3">
                {isSignup ? (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-primary fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsSignup(false);
                        setOtpSent(false);
                        setOtp("");
                        setMessage("");
                      }}
                    >
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <span
                      className="text-primary fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsSignup(true);
                        setOtpSent(false);
                        setOtp("");
                        setMessage("");
                      }}
                    >
                      Sign Up
                    </span>
                  </>
                )}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
