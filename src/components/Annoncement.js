import * as React from 'react';
import { Button, IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import api from "../utils/api";

function Annoncement() {


    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [visibleItemCount, setVisibleItemCount] = React.useState(3)


    console.log(data)

    const fetchData = async () => {
        try {
            const response = await api.get("annocements")
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    React.useEffect(() => {
        fetchData()
    }, [])




    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div className="app-component-announcements">
                <div className="app-component-announcements__head">
                    <h3>Announcement</h3>
                </div>
                {data && data.slice(0, visibleItemCount).map((item, index) => {
                    return (
                        <div className="app-component-announcements__list">
                            <ul className="notificaton-card__list">
                                <li className="notificaton-card__listitem">
                                    <div className="notificaton-card__info">
                                        <h4>{item.title}</h4>
                                        <h4>{item.description}</h4>
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
                            </ul>
                        </div>
                    )
                })}
                {visibleItemCount < data.length && (
                    <Button className="text-button" onClick={() => setVisibleItemCount(data.length)}>
                        See More
                    </Button>
                )}
            </div>
        </>
    )
}
export default Annoncement;