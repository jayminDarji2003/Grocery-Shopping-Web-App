import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
    // Context
    const [auth, setAuth] = useAuth();

    // State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Get user data on component mount
    useEffect(() => {
        const userData = auth?.user || {};
        const { email, name, phone, address } = userData;
        setName(name || '');
        setPhone(phone || '');
        setEmail(email || '');
        setAddress(address || '');
    }, [auth?.user]);

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });

            if (data?.error) {
                toast.error(data?.error);
            } else {
                // Update context and local storage with the new user data
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = ls ? JSON.parse(ls) : {};
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));

                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container-fluid my-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <div className="form-container my-3 rounded-3" style={{ marginTop: "-40px", backgroundColor: "white" }}>
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">USER PROFILE</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Phone"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Address"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
