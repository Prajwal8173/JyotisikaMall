import React from 'react'
import "../styles/Myaccount.css";
import rakhi from '../assets/rakhi.png'
import { useState } from "react";

const initialFormState = {
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const Myaccount = ({ onSubmit }) => {

    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const nextErrors = {};
        if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
        if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";
        if (!form.displayName.trim()) nextErrors.displayName = "Display name is required";
        if (!form.email.trim()) {
            nextErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Enter a valid email";
        }
        if (form.newPassword || form.confirmPassword || form.oldPassword) {
            if (!form.oldPassword) nextErrors.oldPassword = "Old password is required";
            if (!form.newPassword) nextErrors.newPassword = "New password is required";
            if (form.newPassword && form.newPassword.length < 8) {
                nextErrors.newPassword = "New password must be at least 8 characters";
            }
            if (form.newPassword !== form.confirmPassword) {
                nextErrors.confirmPassword = "Passwords do not match";
            }
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setSubmitting(true);
            const payload = { ...form };
            if (!form.oldPassword && !form.newPassword && !form.confirmPassword) {
                delete payload.oldPassword;
                delete payload.newPassword;
                delete payload.confirmPassword;
            }
            if (onSubmit) {
                await onSubmit(payload);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const renderError = (field) =>
        errors[field] ? (
            <div className="invalid-feedback d-block">{errors[field]}</div>
        ) : null;
    return (
        <div style={{ backgroundColor: "#fefaea" }}>

            {/* Header Navigation - Responsive
            <div className="container-fluid px-3 px-md-4 py-3" style={{ backgroundColor: "#fefaea" }}>
                <div className="row align-items-center">
                    <div className='col-12 col-md-3 col-lg-2'>
                        <img
                            src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/bxn4s0bj_expires_30_days.png"}
                            className="img-fluid" 
                            style={{ height: "80px", width: "auto", objectFit: "contain" }}
                            alt="Logo"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-7 d-none d-md-flex align-items-center" style={{ fontSize: "18px", fontWeight: "500" }}>
                        <span className="me-3">Products</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/2eksad0c_expires_30_days.png"} className="me-3" style={{ width: "20px", height: "20px" }} alt="Arrow" />
                        <span className="me-3">Shop by purpose</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/0xrbgk8b_expires_30_days.png"} className="me-3" style={{ width: "20px", height: "20px" }} alt="Arrow" />
                        <span className="me-3">Siddh collection</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/04d5owxb_expires_30_days.png"} className="me-3" style={{ width: "20px", height: "20px" }} alt="Arrow" />
                        <span className="me-3">Sawan Sale</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/m3pjo81t_expires_30_days.png"} className="me-3" style={{ width: "20px", height: "20px" }} alt="Arrow" />
                        <span className="me-3">Astro Stone</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/9qfvy7ii_expires_30_days.png"} className="me-3" style={{ width: "20px", height: "20px" }} alt="Arrow" />
                        <span className="me-3">Festival</span>
                        <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/zc73xk90_expires_30_days.png"} style={{ width: "20px", height: "20px" }} alt="Arrow" />
                    </div>
                    <div className='col-12 col-md-3 col-lg-3 d-flex justify-content-end'>
                        <div className="d-flex gap-2">
                            <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/usti218l_expires_30_days.png"} className="img-fluid" style={{ width: "30px", height: "30px" }} alt="Icon" />
                            <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/rdyh30hu_expires_30_days.png"} className="img-fluid" style={{ width: "30px", height: "30px" }} alt="Icon" />
                            <img src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/206cicc1_expires_30_days.png"} className="img-fluid" style={{ width: "30px", height: "30px" }} alt="Icon" />
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Page Title */}
            <div className='text-center py-4'>
                <h1 className="display-4 fw-bold">My Account</h1>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className='container-fluid px-3 px-md-4 pb-5'>
                <div className='row g-4'>
                    {/* Sidebar - Responsive */}
                    <div className="col-12 col-lg-3">
                        <div className="bg-light p-4 rounded" style={{ minHeight: "600px" }}>
                            <div className="text-center">
                                <img
                                    src={rakhi}
                                    alt="Profile"
                                    className="rounded-circle mb-3"
                                    style={{ height: "120px", width: "120px", objectFit: "cover" }}
                                />
                                <h4 className="mb-4">User</h4>
                            </div>

                            <div className="list-group list-group-flush">
                                <div className="list-group-item bg-transparent border-0 px-0">
                                    <h5 className="mb-0 fw-bold">Account</h5>
                                </div>
                                <hr className="my-3" />
                                <div className="list-group-item bg-transparent border-0 px-0">
                                    <h6 className="mb-0 text-muted">Address</h6>
                                </div>
                                <div className="list-group-item bg-transparent border-0 px-0">
                                    <h6 className="mb-0 text-muted">Orders</h6>
                                </div>
                                <div className="list-group-item bg-transparent border-0 px-0">
                                    <h6 className="mb-0 text-muted">Wishlist</h6>
                                </div>
                                <div className="list-group-item bg-transparent border-0 px-0">
                                    <h6 className="mb-0 text-muted">Log Out</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Content - Responsive */}
                    
                        <div className="col-12 col-lg-9" >
                            <div className=" p-4 rounded " style={{ backgroundColor: "#fefaea" }}>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <h5 className="fw-semibold mb-3">Account Details</h5>
                                        </div>

                                        <div className="col-12 col-sm-6">
                                            <label htmlFor="firstName" className="form-label">First name *</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                                placeholder="First name"
                                                value={form.firstName}
                                                onChange={handleChange}
                                            />
                                            {renderError("firstName")}
                                        </div>

                                        <div className="col-12 col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name *</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                                placeholder="Last name"
                                                value={form.lastName}
                                                onChange={handleChange}
                                            />
                                            {renderError("lastName")}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="displayName" className="form-label">Display name *</label>
                                            <input
                                                id="displayName"
                                                name="displayName"
                                                type="text"
                                                className={`form-control ${errors.displayName ? "is-invalid" : ""}`}
                                                placeholder="Display name"
                                                value={form.displayName}
                                                onChange={handleChange}
                                            />
                                            <div className="form-text">
                                                This will be how your name will be displayed in the account section and in reviews
                                            </div>
                                            {renderError("displayName")}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email *</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                placeholder="Email"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                            {renderError("email")}
                                        </div>

                                        <div className="col-12">
                                            <hr className="my-4" />
                                            <h5 className="fw-semibold mb-3">Password</h5>
                                        </div>

                                        <div className="col-12 ">
                                            <label htmlFor="oldPassword" className="form-label">Old password</label>
                                            <input
                                                id="oldPassword"
                                                name="oldPassword"
                                                type="password"
                                                className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
                                                placeholder="Old password"
                                                value={form.oldPassword}
                                                onChange={handleChange}
                                                autoComplete="current-password"
                                            />
                                            {renderError("oldPassword")}
                                        </div>

                                        <div className="col-12 ">
                                            <label htmlFor="newPassword" className="form-label">New password</label>
                                            <input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                                                placeholder="New password"
                                                value={form.newPassword}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                            />
                                            {renderError("newPassword")}
                                        </div>

                                        <div className="col-12 ">
                                            <label htmlFor="confirmPassword" className="form-label">Repeat new password</label>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                                placeholder="Repeat new password"
                                                value={form.confirmPassword}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                            />
                                            {renderError("confirmPassword")}
                                        </div>

                                        <div className="col-12">
                                            <hr className="my-4" />
                                            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
                                                <button type="submit" className='btn' disabled={submitting} style={{ backgroundColor: "#fd8b07" }}>
                                                    Save changes
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>

        </div>
    
    )
}

export default Myaccount
