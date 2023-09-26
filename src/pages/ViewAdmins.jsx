import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { noauthinstance } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAdmins = () => {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState(null);

    const fetchAgents = async () => {
        try {
            // const NewaccessToken = localStorage.getItem('NewaccessToken');
            // console.log(NewaccessToken)
            // if (!NewaccessToken) {
            //     throw new Error('Authentication credentials were not provided.');
            // }

            // const headers = {
            //     Authorization: `Bearer ${NewaccessToken}`,
            // };

            const response = await noauthinstance.get('user/admins/');
            setAgents(response.data);
        } catch (err) {
            console.error('Error fetching agents:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchAgents();
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
                                            <h4>List of Admins Created by superadmin</h4>
                                        </div>
                                        {error && (
                                            <div className="error-message">
                                                <p>Error: {error.message}</p>
                                            </div>
                                        )}
                                        <table className="custom-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Roles</th>
                                                    <th>Constituency</th>
                                                    {/* <th>polling stations</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {agents.map((agent) => (
                                                    <tr key={agent.id || '-'}>
                                                        <td>{agent.id || '-'}</td>
                                                        <td>{agent.first_name || '-'}</td>
                                                        <td>{agent.last_name || '-'}</td>
                                                        <td>{agent.email || '-'}</td>
                                                        <td>{agent.phone || '-'}</td>
                                                        <td>{agent.roles || '-'}</td>
                                                        <td>{agent.constituency ? agent.constituency.name || '-' : '-'}</td>

                                                        {/* <td>{agent.polling_stations.name || '-'}</td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default ViewAdmins;
