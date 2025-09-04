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
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Request OTP API
  const handleGetOtp = async () => {
    if (!mobile) {
      setStatus("danger");
      setMessage("Please enter mobile number");
      return;
    }
    try {
      const payload = isSignup
        ? { mobile_number: mobile, action: "signin" }
        : { mobile_number: mobile };

      const res = await axios.post(`${BASE_URL}/sendOtpmobile`, payload);

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

  // 🔹 Verify OTP API
  const handleVerifyOtp = async () => {
    if (!otp) {
      setStatus("warning");
      setMessage("Please enter OTP");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/VerifyOtp`, {
        mobile_number: mobile,
        otp: otp,
      });

      if (res.data.status === "success") {
        setStatus("success");
        setMessage("Login Successful ✅");

        // Save user data for session
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("mobile_number", res.data.mobile_number);
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

  return (
    <Container fluid className="auth-container">
      <Row className="min-vh-100">
        {/* Left Side */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-start px-5 auth-left"
        >
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
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-light"
        >
          <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "380px" }}>
            <Card.Body>
              <h3 className="text-center mb-4">
                {isSignup ? "Sign Up" : "Login"} to Continue
              </h3>

              {!otpSent ? (
                <Form>
                  <Form.Group controlId="mobile" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="warning"
                    className="w-100 fw-bold"
                    onClick={handleGetOtp}
                  >
                    Get OTP
                  </Button>
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="otp" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    className="w-100 fw-bold"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </Button>
                </Form>
              )}

              {message && (
                <Alert variant={status} className="mt-3 text-center">
                  {message}
                </Alert>
              )}

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
