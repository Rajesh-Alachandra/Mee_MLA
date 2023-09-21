import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api, { noauthinstance } from '../utils/api';
import Feeds from '../components/Feeds';

const Create_Agent = () => {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('agent');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [constituency, setConstituency] = useState('');
    const [pollingvalue, setPollingvalue] = useState("")
    const [constituencyData, setConstituencyData] = useState([]);
    const [pollingData, setPollingData] = useState([]);
    const [error, setError] = useState(null);

    const fetchConstituency = async () => {
        try {
            const response = await noauthinstance.get('constituency');
            setConstituencyData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    const fetchPollingStationsByConstituency = async (constituencyId) => {
        try {
            const response = await noauthinstance.get(`polling_stations/${constituencyId}`);
            setPollingData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    const handleConstituencyChange = (e) => {
        const selectedConstituency = e.target.value;
        setConstituency(selectedConstituency);
        fetchPollingStationsByConstituency(selectedConstituency);
    };

    const postAgent = async () => {
        const formData = new FormData();
        formData.append('constituency', constituency);
        formData.append('polling_station', pollingvalue);
        formData.append('first_name', first_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('last_name', last_name);
        formData.append('phone', phone);
        formData.append('roles', roles);

        try {
            const response = await noauthinstance.post('user/agent-register/', formData);
            if (response) {
                toast.success('Agent successfully created!');
            }
            setConstituency('');
            setPollingvalue('');
            setLastname('');
            setPhone('');
            setEmail('');
            setPassword('');
            setFirstname('');
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchConstituency();
    }, []);

    return (
        <>
            <div className="app-page-home">
                <Grid>
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid>
                                    <div className="app-component-reportcard">
                                        <div className="app-component-reportcard__head">
                                            <h4>Create Agent</h4>
                                        </div>
                                        <div className="app-component-reportcard__count">
                                            <div className="select-tags">
                                                <div className="form-group">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <label>First Name</label>
                                                            <input
                                                                value={first_name}
                                                                onChange={(e) => setFirstname(e.target.value)}
                                                                type="text"
                                                                className="input-form"
                                                                placeholder="Enter FirstName"
                                                            ></input>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <label>Last Name</label>
                                                            <input
                                                                value={last_name}
                                                                onChange={(e) => setLastname(e.target.value)}
                                                                type="text"
                                                                className="input-form"
                                                                placeholder="Enter LastName"
                                                            ></input>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <label>Phone Number</label>
                                                        <input
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            type="text"
                                                            className="input-form"
                                                            placeholder="Enter PhoneNumber"
                                                        ></input>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <label>Email</label>
                                                        <input
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            type="text"
                                                            className="input-form"
                                                            placeholder="Enter Email"
                                                        ></input>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <label>Password</label>
                                                        <input
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            type="text"
                                                            className="input-form"
                                                            placeholder="Enter Password"
                                                        ></input>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="form-group">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <label>Constituency</label>
                                                        <select
                                                            className="input-form"
                                                            value={constituency}
                                                            onChange={handleConstituencyChange}
                                                        >
                                                            <option value="">Select Polling Constituency</option>
                                                            {constituencyData.map((option, index) => (
                                                                <option key={index} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <label>Polling Booth</label>
                                                        <select className="input-form"
                                                            value={pollingvalue}
                                                            onChange={(e) => setPollingvalue(e.target.value)}
                                                        >
                                                            <option value="" disabled selected>
                                                                Select Polling Booth
                                                            </option>
                                                            {pollingData.map((option, index) => (
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
                                            <button onClick={postAgent}>Create Agent</button>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Create_Agent;
