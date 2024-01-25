import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";

// The axios package is used to create bridge between "backend" and "frontend" 
// (using this package we can able to perform get post put delete from the backend)
//  Inshort "axios" package is used to tigger the API
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // This Package is used to show popups notification to the user 
import "../../styles/AuthStyles.css";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success(res.data.msg)
                navigate('/login')
            }
            else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

    };
    // console.log(process.env.REACT_APP_API);
    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Register Form</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            // id="exampleInputEmail1"
                            placeholder="Enter Your Name"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            // id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            // id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            // id="exampleInputEmail1"
                            placeholder="Enter Your Phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            // id="exampleInputEmail1"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            // id="exampleInputEmail1"
                            placeholder="What is Your Favorite sports"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary rounded-3 register-btn">
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Register