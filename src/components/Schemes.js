import * as React from 'react';
import { Button, IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavIcon from '../Icons/FavIcon';
import api from "../utils/api";

function Schemes() {

    const [post, setPost] = React.useState([]);
    const [posterror, setPostError] = React.useState(null);


    console.log(post)

    const fetchposts = async () => {
        try {
            const response = await api.get("schemas/")
            setPost(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setPostError(err);
        }
    };


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
        fetchposts()
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
            <div className="app-component-feeds">
                <div className="app-component-feeds__head">
                    <h3>Schemes</h3>
                </div>
                <div className="app-component-feeds__body ">
                    <div className="">
                        <p className="app-component-feeds--title">Announcement</p>
                        <div className='announce-scroll'>
                        {data && data.map((item, index) => {
                            return (
                                <ul className="notificaton-card__list">
                                    <li key={index} className="notificaton-card__listitem">
                                        <div className="notificaton-card__info">
                                            <h4>{item.title}</h4>
                                            <span>{new Date(item.updatedAt).toDateString()}</span>
                                        </div>
                                        {/* <div className="notificaton-card__actions">
                                            <ul className="notificaton-card__actions--list">
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
                                        </div> */}
                                    </li>
                                </ul>
                            )
                        })}
                        </div>
                    </div>

                    <div className="">
                        <p className="app-component-feeds--title">Other</p>
                        <ul className="notificaton-card__list feeds-scroll">
                            {post && post.slice(0, visibleItemCount).map((item, index) => {
                                console.log(item)
                                return (
                                    <li key={item} className="notificaton-card__listitem">
                                        <div className="feeds-type-photo">
                                            <div className="feeds-type-photo__wrapper">
                                                <div className="notificaton-card__info">
                                                    <h4>{item.title}</h4>
                                                    <p>{item.description}</p>
                                                    <span>{new Date(item.updatedAt).toDateString()}</span>
                                                </div>
                                                {/* <div className="notificaton-card__actions">
                                                    <ul className="notificaton-card__actions--list">
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
                                                </div> */}
                                            </div>
                                            <div className="feeds-type-photo-wrapper">
                                                <img className="feed-post-image" src={item.image} />
                                                {/* <div className="feeds-type-photo-actions">
                                                    <ul className="feeds-type-photo-actions__list">
                                                        <li className="feeds-type-photo-actions__item">
                                                            <Button className="like-btn like-btn--active">
                                                                <FavIcon />
                                                                <span className="text">{item.likes}Like</span>
                                                            </Button>
                                                        </li>
                                                        <li className="feeds-type-photo-actions__item">
                                                            <Button><img src="/images/comment.svg" /><span className="text">Comment</span></Button>
                                                        </li>
                                                        <li className="feeds-type-photo-actions__item">
                                                            <Button><img src="/images/repost.svg" /><span className="text">Repost</span></Button>
                                                        </li>
                                                    </ul>
                                                    <div className="feeds-type-photo-actions__share">
                                                        <IconButton><img src="/images/share.svg" /></IconButton>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="app-component-announcements__foot">
                    {visibleItemCount < post.length && (
                        <Button className="text-button" onClick={() => setVisibleItemCount(post.length)}>
                            See More
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Schemes;