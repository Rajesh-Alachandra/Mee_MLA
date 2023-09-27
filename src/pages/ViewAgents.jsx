import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { noauthinstance } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAgents = () => {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const fetchAgents = async () => {
        try {
            const NewaccessToken = localStorage.getItem('NewaccessToken');
            console.log(NewaccessToken)
            if (!NewaccessToken) {
                throw new Error('Authentication credentials were not provided.');
            }

            const headers = {
                Authorization: `Bearer ${NewaccessToken}`,
            };

            const response = await noauthinstance.get('user/admin/agents/', { headers });
            const nonDeletedAgents = response.data.filter((agent) => !agent.deleted);
            setAgents(nonDeletedAgents);
        } catch (err) {
            console.error('Error fetching agents:', err);
            setError(err);
        }
    };
    const toggleActive = async (agent) => {
        try {
            const NewaccessToken = localStorage.getItem('NewaccessToken');

            const updatedAgent = { ...agent, is_active: !agent.is_active };
            const headers = {
                Authorization: `Bearer ${NewaccessToken}`,
            };
            await noauthinstance.put(`user/status/${agent.id}/`, updatedAgent, { headers });
            setAgents((prevAgents) =>
                prevAgents.map((prevAgent) =>
                    prevAgent.id === agent.id ? updatedAgent : prevAgent
                )
            );

            toast.success(`Agent ${updatedAgent.is_active ? 'activated' : 'deactivated'} successfully`);
        } catch (err) {
            console.error(`Error toggling agent ${agent.id}:`, err);
            setError(err);
        }
    };
    useEffect(() => {
        fetchAgents();
    }, []);
    const handleAgentCheckboxChange = (agentId) => {
        if (agentId === 'all') {

            setSelectAll(!selectAll);

            if (!selectAll) {
                setSelectedAgents(agents.map((agent) => agent.id));
            } else {
                setSelectedAgents([]);
            }
        } else {

            if (selectedAgents.includes(agentId)) {
                setSelectedAgents(selectedAgents.filter((id) => id !== agentId));
            } else {
                setSelectedAgents([...selectedAgents, agentId]);
            }
        }
    };

    const handleDeleteSelectedAgents = async () => {
        try {
            const NewaccessToken = localStorage.getItem('NewaccessToken');
            if (!NewaccessToken) {
                throw new Error('Authentication credentials were not provided.');
            }

            const headers = {
                Authorization: `Bearer ${NewaccessToken}`,
            };

            const agentIdsToDelete = selectedAgents;

            const response = await noauthinstance.post('user/agent/delete/', {
                agent_ids: agentIdsToDelete,
            }, {
                headers,
            });

            setAgents((prevAgents) =>
                prevAgents.filter((agent) => !agentIdsToDelete.includes(agent.id))
            );

            toast.success(response.data.message);
            setSelectedAgents([]);
        } catch (err) {
            console.error('Error deleting selected agents:', err);
            setError(err);
        }
    };


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
                                            <h4>List of Agents Created by Admin</h4>
                                        </div>
                                        {error && (
                                            <div className="error-message">
                                                <p>Error: {error.message}</p>
                                            </div>
                                        )}
                                        <div className='delete-agents'>
                                        <button onClick={handleDeleteSelectedAgents}>Delete Agents</button>
                                        </div>
                                        <table className="custom-table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleAgentCheckboxChange('all')}
                                                            checked={selectAll}
                                                        />
                                                    </th>
                                                    <th>ID</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Phone</th>
                                                    <th>Roles</th>
                                                    <th>Constituency</th>
                                                    <th>polling stations</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {agents.map((agent) => (
                                                    <tr key={agent.id || '-'}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                onChange={() => handleAgentCheckboxChange(agent.id)}
                                                                checked={selectedAgents.includes(agent.id)}
                                                            />
                                                        </td>
                                                        <td>{agent.id || '-'}</td>
                                                        <td>{agent.first_name || '-'}</td>
                                                        <td>{agent.last_name || '-'}</td>
                                                        <td>{agent.phone || '-'}</td>
                                                        <td>{agent.roles || '-'}</td>
                                                        <td>{agent.constituency.name || '-'}</td>
                                                        <td className='act-inact'>
                                                            {agent.polling_stations.map((station) => (
                                                                <div key={station.id}>{station.name}</div>
                                                            ))}
                                                            <button
                                                                style={{
                                                                    backgroundColor: agent.is_active ? 'green' : 'red',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    padding: '8px',
                                                                }}
                                                                variant="contained"
                                                                onClick={() => toggleActive(agent)}
                                                            >
                                                                {agent.is_active ? 'Deactivate' : 'Activate'}
                                                            </button>
                                                        </td>

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


export default ViewAgents;
