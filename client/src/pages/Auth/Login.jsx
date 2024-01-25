import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
// import { toast } from 'react-toastify'
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password, });
            if (res && res.data.success) {
                toast.success(res.data.msg)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/")
            }
            else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

    };


    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title mb-3">Login Form</h4>
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
                    <div className="mb-3 mt-4 text-center">
                        <button type="submit" className="btn btn-primary rounded-3 register-btn" onClick={() => {
                            navigate('/forgot-password')
                        }}>
                            Forgot Password
                        </button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary rounded-3 register-btn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login