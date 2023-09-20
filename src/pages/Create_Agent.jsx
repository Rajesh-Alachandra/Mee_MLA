import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api, { noauthinstance } from '../utils/api';
import Feeds from '../components/Feeds';

const Create_Agent = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('agent');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
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
        setSelectedValue(selectedConstituency);
        fetchPollingStationsByConstituency(selectedConstituency);
    };

    const postAgent = async () => {
        const formData = new FormData();
        formData.append('constituency', selectedValue);
        formData.append('polling_station', pollingvalue);
        formData.append('firstname', firstname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('lastname', lastname);
        formData.append('number', number);
        formData.append('roles', roles);

        try {
            const response = await noauthinstance.post('user/admin-register/', formData);
            if (response) {
                toast.success('Admin successfully created!');
            }
            setSelectedValue('');
            setPollingvalue('');
            setLastname('');
            setNumber('');
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
                                                                value={firstname}
                                                                onChange={(e) => setFirstname(e.target.value)}
                                                                type="text"
                                                                className="input-form"
                                                                placeholder="Enter FirstName"
                                                            ></input>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <label>Last Name</label>
                                                            <input
                                                                value={lastname}
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
                                                    <Grid item xs={6}>
                                                        <label>Phone Number</label>
                                                        <input
                                                            value={number}
                                                            onChange={(e) => setNumber(e.target.value)}
                                                            type="text"
                                                            className="input-form"
                                                            placeholder="Enter PhoneNumber"
                                                        ></input>
                                                    </Grid>
                                                    <Grid item xs={6}>
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
                                                            value={selectedValue}
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
