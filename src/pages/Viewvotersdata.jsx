import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { noauthinstance } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCloudDownload } from 'react-icons/bs';
import XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const Viewvotersdata = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [constituencyData, setConstituencyData] = useState([]);
    const [pollingData, setPollingData] = useState([]);
    const [voterData, setVoterData] = useState(null);
    const [error, setError] = useState(null);
    const [polling_station, setPollingstation] = useState("");
    const [file, setFile] = useState(null);

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

    const fetchVoterData = async () => {
        try {
            const response = await noauthinstance.get(`voters/list/export/${polling_station}`);
            setVoterData(response.data);
        } catch (err) {
            console.error('Error fetching voter data:', err);
            toast.error('Error fetching voter data', {
                position: "top-right",
            });
        }
    };

    const handleDownload = () => {
        if (!voterData) {
            toast.error('No voter data available to download', {
                position: "top-right",
            });
            return;
        }

        const downloadUrl = `http://65.2.174.18:70/api/voters/list/export/${polling_station}`;

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'voter_data.xlsx';

        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();

        toast.success('Voter data download initiated', {
            position: "top-right",
        });
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
                                            <h4>View Voters Data</h4>
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
                                                                {pollingData.map((option, index) => (
                                                                    <option key={index} value={option.id}>
                                                                        {option.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </Grid>

                                                        <div className="form-group-voters">
                                                            <button  className="view-vote"onClick={fetchVoterData}>
                                                                View Voters Data
                                                            </button>
                                                            
                                                           
                                                            {voterData && polling_station && (
                                                                <div>
                                                                <button style={{'padding':'10px', cursor:'pointer'}} onClick={handleDownload}>
                                                                    <BsCloudDownload /> Download as excel
                                                                </button>
                                                                <Link to='/pdf'>
                                                                <button style={{'padding':'10px',marginLeft:'10px', cursor:'pointer'}} >
                                                                    
                                                                View and download as pdf
                                                            </button>
                                                            </Link>
                                                            </div>
                                                            )}
                                                        </div>
                                                      
                                                        {voterData && Array.isArray(voterData) && voterData.length > 0 && (
                                                            <div className="voter-data-table">
                                                                <h4>Voter Data</h4>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Voter ID</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {voterData.map((voter, index) => (
                                                                            <tr key={index}>
                                                                                <td>{voter.name}</td>
                                                                                <td>{voter.voterId}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}

                                                    </Grid>
                                                </div>
                                            </div>
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

export default Viewvotersdata;
