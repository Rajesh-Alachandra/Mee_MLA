import React from 'react'
import { Button, Grid } from "@mui/material";
import Feeds from "../components/Feeds";
import api, { noauthinstance } from "../utils/api"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create_Admin = () => {


    const [first_name, setFirstname] = useState("");

    const [last_name, setLastname] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [phone, setPhone] = useState("")

    const [constituency, setConstituency] = useState('');

    const [roles, setRoles] = useState("admin")

    console.log(roles)



    const [constituencyData, setConstituencyData] = useState([]);
    const [error, setError] = useState(null);


    console.log(constituencyData)


    const fetchConstituency = async () => {
        try {
            const response = await noauthinstance.get("constituency")
            setConstituencyData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchConstituency()
    }, [])

    const postAdmin = async () => {

        const formData = new FormData();
        formData.append("constituency", constituency);
        formData.append("first_name", first_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("last_name", last_name);
        formData.append("phone", phone);
        formData.append("roles", roles);

        try {
            const response = await noauthinstance.post("user/admin-register/", formData)
            if (response) {
                toast.success("Admin successfully created!")
            }
            setConstituency("");
            setLastname("");
            setPhone("");
            setEmail("");
            setPassword("");
            setFirstname("")
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };






    return (
        <>
            <div className="app-page-home">
                <Grid >
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid >
                                    <div className="app-component-reportcard">
                                        <div className="app-component-reportcard__head">
                                            <h4>Create Admin</h4>
                                        </div>
                                        <div className="app-component-reportcard__count">
                                            <div className="select-tags">
                                                <div className="form-group">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <label>First Name</label>
                                                            <input value={first_name} onChange={(e) => setFirstname(e.target.value)} type="text" className="input-form" placeholder="Enter FirstName"></input>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <label>Last Name</label>
                                                            <input value={last_name} onChange={(e) => setLastname(e.target.value)} type="text" className="input-form" placeholder="Enter LastName"></input>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <label>Email</label>
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="input-form" placeholder="Enter Email"></input>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <label>Password</label>
                                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input-form" placeholder="Enter Password"></input>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="form-group">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <label>Mobile Number</label>
                                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="input-form" placeholder="Enter Mobile Number"></input>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <label>Constituency</label>
                                                        <select className="input-form"
                                                            value={constituency}
                                                            onChange={(e) => setConstituency(e.target.value)}
                                                        >
                                                            <option value="" disabled selected>Select Polling Constituency</option>
                                                            {constituencyData.map((option, index) => (
                                                                <option key={index} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                        <div className="create-post-button">
                                            <button onClick={postAdmin}>Create Admin</button>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div >
        </>
    )
}

export default Create_Admin