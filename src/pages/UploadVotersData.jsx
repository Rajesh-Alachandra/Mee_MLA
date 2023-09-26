import React, { useEffect, useState, useRef } from 'react';
import { Grid } from "@mui/material";
import { noauthinstance } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadVotersData = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [constituencyData, setConstituencyData] = useState([]);
    const [pollingData, setPollingData] = useState([]);
    const [error, setError] = useState(null);
    const [polling_station, setPollingstation] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleConstituencyChange = (e) => {
        const selectedConstituency = e.target.value;
        setSelectedValue(selectedConstituency);
        fetchPollingStationsByConstituency(selectedConstituency);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
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
        try {
            if (!polling_station) {
                toast.error('Please select a polling booth.', {
                    position: "top-right",
                });
                return;
            }

            const selectedPollingBooth = pollingData.find(option => option.id === parseInt(polling_station));
            console.log('Selected Polling Booth:', selectedPollingBooth);

            if (selectedPollingBooth) {
                if (selectedPollingBooth.is_uploded) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('polling_station', polling_station);
                    const response = await noauthinstance.post('voters/re-upload/',formData);
                    toast.success(response.data.message, {
                        position: "top-right",
                    });
                } else {
                    
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('polling_station', polling_station);
        
                    const response = await noauthinstance.post('voters/upload/', formData);
                    toast.success(response.data.message, {
                        position: "top-right",
                    });
                }

                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setPollingstation("");
                setSelectedValue("");
                setFile(null);

                
                setPollingData(prevPollingData => {
                    return prevPollingData.map(option => {
                        if (option.id === parseInt(polling_station)) {
                            return { ...option, is_uploded: true };
                        }
                        return option;
                    });
                });
            }
        } catch (err) {
            console.error('Error uploading data:', err);
            const errorMessage = err.response && err.response.data ? err.response.data.message : 'Error uploading data';
            toast.error(errorMessage, {
                position: "top-right",
            });
            setPollingstation("");
            setSelectedValue("");
            setFile(null);
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
                                            <h4>Upload Voters Data</h4>
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
                                                            <select
                                                                className="input-form"
                                                                value={polling_station}
                                                                onChange={(e) => setPollingstation(e.target.value)}
                                                            >
                                                                <option value="" disabled>
                                                                    Select Polling Booth
                                                                </option>
                                                                <optgroup label="Not Uploaded Booths">
                                                                    {pollingData.map((option, index) => (
                                                                        !option.is_uploded && (
                                                                            <option key={index} value={option.id}>
                                                                                {option.name}
                                                                            </option>
                                                                        )
                                                                    ))}
                                                                </optgroup>
                                                                <optgroup label="Uploaded Booths">
                                                                    {pollingData.map((option, index) => (
                                                                        option.is_uploded && (
                                                                            <option key={index} value={option.id}>
                                                                                {option.name}
                                                                            </option>
                                                                        )
                                                                    ))}
                                                                </optgroup>
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
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
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
                <ToastContainer />
            </div>
        </>
    );
};

export default UploadVotersData;
