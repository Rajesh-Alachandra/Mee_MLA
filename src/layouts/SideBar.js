import { Button } from "@mui/material";
import DashboardIcon from "../Icons/DashboardIcon";
import FeedsIcon from "../Icons/FeedsIcon";
import SurveysIcon from "../Icons/SurveysIcon";
import SchemesIcon from "../Icons/SchemesIcon";
import ReportedIcon from "../Icons/ReportedIcon";
import NotificationsIcon from "../Icons/NotificationsIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { Link, useNavigate } from "react-router-dom";

function SideBar() {

    const navigate = useNavigate()

    return (
        <>
            <div className="app-sidebar">
                <div className="app-sidebar-logo">
                    <img src="/images/logo.svg" />
                </div>
                <div className="app-sidebar-menu">
                    <ul className="app-sidebar-menu-list">
                        <li className="app-sidebar-menu-list-item">
                            <Link to="/Dashboard/home"><Button className="active"><DashboardIcon /><span className="app-sidebar-menu-title">Dashboard</span></Button></Link>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Link to="/Dashboard/Mainfeeds"> <Button><FeedsIcon /><span className="app-sidebar-menu-title">Feeds</span></Button></Link>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Link to="/Dashboard/survey_polls"><Button><SurveysIcon /><span className="app-sidebar-menu-title">Surveys / Polls</span></Button></Link>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Link to="/Dashboard/govt_schemes"><Button><SchemesIcon /><span className="app-sidebar-menu-title">Govt. Schemes</span></Button></Link>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Link to="/Dashboard/reports"><Button><ReportedIcon /><span className="app-sidebar-menu-title">Reported</span></Button></Link>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Button><NotificationsIcon /><span className="app-sidebar-menu-title">Notifications</span></Button>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <Button><SettingsIcon /><span className="app-sidebar-menu-title">Settings</span></Button>
                        </li>
                        <li className="app-sidebar-menu-list-item">
                            <div className="app-sidebar-menu-list-add-post">
                                <Button>
                                    <span onClick={() => navigate("/Dashboard/create_announcement")}>Add New Annoncement</span>
                                    <i><img src="/images/plus.svg" /></i>
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default SideBar;