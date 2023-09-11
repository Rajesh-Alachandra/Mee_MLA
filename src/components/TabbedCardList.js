import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import api from "../utils/api"

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



function TabbedCardList() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [reports, setReports] = React.useState([]);
    const [reportsError, setReportsError] = React.useState(null);

    const [pendingReports, setPendingReports] = React.useState([]);
    const [solvedReports, setSolvedReports] = React.useState([]);
    const [failedReports, setFailedReports] = React.useState([]);


    console.log(pendingReports)
    console.log(solvedReports)
    console.log(failedReports)

    console.log(reports);

    const fetchReports = async () => {
        try {
            const response = await api.get("reports/");
            setReports(response.data.reports);

            const pending = response.data.reports.filter((report) => report.status === "pending");
            const solved = response.data.reports.filter((report) => report.status === "solved");
            const failed = response.data.reports.filter((report) => report.status === "failed");

            setPendingReports(pending);
            setSolvedReports(solved);
            setFailedReports(failed);
        } catch (err) {
            console.error("Error fetching data:", err);
            setReportsError(err);
        }
    };

    React.useEffect(() => {
        fetchReports();
    }, []);


    return (
        <>
            <div className="app-component-tabbed-card-list">
                <div className="app-component-tabbed-card-list__head">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Problem Reported" />
                        <Tab label="Solved" />
                        <Tab label="Pending" />
                        <Tab label="Failed" />
                    </Tabs>
                </div>
                <div className="app-component-tabbed-card-list__content">
                    <CustomTabPanel value={value} index={0}>
                        <ul className="notificaton-card__list">
                            {reports && reports.map((item, inddex) => {
                                return (
                                    <li className="notificaton-card__listitem">
                                        <div className="notificaton-card__info">
                                            <h4>{item.report}</h4>
                                            <span>{new Date(item.updatedAt).toDateString()}</span>
                                        </div>
                                        <div className="notificaton-card__actions">
                                            <ul className="notificaton-card__actions--list">
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton>
                                                        <img src="/images/pin.svg" />
                                                    </IconButton>
                                                </li>
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <img src="/images/menu-horizontal.svg" />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                    </Menu>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ul className="notificaton-card__list">
                            {solvedReports && solvedReports.map((item, inddex) => {
                                return (
                                    <li className="notificaton-card__listitem">
                                        <div className="notificaton-card__info">
                                            <h4>{item.report}</h4>
                                            <span>{new Date(item.updatedAt).toDateString()}</span>
                                        </div>
                                        <div className="notificaton-card__actions">
                                            <ul className="notificaton-card__actions--list">
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton>
                                                        <img src="/images/pin.svg" />
                                                    </IconButton>
                                                </li>
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <img src="/images/menu-horizontal.svg" />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                    </Menu>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <ul className="notificaton-card__list">
                            {pendingReports && pendingReports.map((item, inddex) => {
                                return (
                                    <li className="notificaton-card__listitem">
                                        <div className="notificaton-card__info">
                                            <h4>{item.report}</h4>
                                            <span>{new Date(item.updatedAt).toDateString()}</span>
                                        </div>
                                        <div className="notificaton-card__actions">
                                            <ul className="notificaton-card__actions--list">
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton>
                                                        <img src="/images/pin.svg" />
                                                    </IconButton>
                                                </li>
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <img src="/images/menu-horizontal.svg" />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                    </Menu>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <ul className="notificaton-card__list">
                            {failedReports && failedReports.map((item, inddex) => {
                                return (
                                    <li className="notificaton-card__listitem">
                                        <div className="notificaton-card__info">
                                            <h4>{item.report}</h4>
                                            <span>{new Date(item.updatedAt).toDateString()}</span>
                                        </div>
                                        <div className="notificaton-card__actions">
                                            <ul className="notificaton-card__actions--list">
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton>
                                                        <img src="/images/pin.svg" />
                                                    </IconButton>
                                                </li>
                                                <li className="notificaton-card__actions--listitem">
                                                    <IconButton
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <img src="/images/menu-horizontal.svg" />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                    </Menu>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </CustomTabPanel>
                </div>
            </div>
        </>
    )
}
export default TabbedCardList;