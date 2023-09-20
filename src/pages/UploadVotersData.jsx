import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material";
import { noauthinstance } from '../utils/api';



const UploadVotersData = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const [constituencyData, setConstituencyData] = useState([]);
    const [pollingData, setPollingData] = useState([]);
    const [error, setError] = useState(null);
    const [pollingvalue, setPollingvalue] = useState("")


    const handleConstituencyChange = (e) => {
        const selectedConstituency = e.target.value;
        setSelectedValue(selectedConstituency);
        fetchPollingStationsByConstituency(selectedConstituency);
    };

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


    const postUpload = async () => {

    }


    useEffect(() => {
        fetchConstituency();
    }, []);



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
                                            <h4>Upload VotersData</h4>
                                        </div>
                                        <div className="app-component-reportcard__count">
                                            <div className="select-tags">
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
                                            <div className="form-group">
                                                <label>Select Upload</label>
                                                <input
                                                    type="file"
                                                    id=""
                                                />
                                            </div>
                                        </div>
                                        <div className="create-post-button">
                                            <button onClick={postUpload}>Upload Data</button>
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

export default UploadVotersData