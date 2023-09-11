import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import person from '../Icons/person.svg';
import dots from '../Icons/dots.svg';
import like from '../Icons/like.svg';
import comment from '../Icons/comment.svg';
import repost from '../Icons/re-post.svg';
import share from '../Icons/share.svg';
import api from "../utils/api";
import { Link } from "react-router-dom";
import Opinion from "./Opinion";
import EditPost from "../components/EditPost";

function MainFeeds() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [visibleItemCount, setVisibleItemCount] = useState(3);
    const [editingPostId, setEditingPostId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get("posts")
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const handleClickEdit = (postId) => {
        setEditingPostId(postId);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };
    const handleDelete = async (itemId) => {
        try {
            await api.delete(`posts/${itemId}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <>
            <div className="app-page-home">
                <Grid container spacing={2}>
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} lg={6}>
                                        <div className="new-feeds-content">
                                            <div className="feeds-top-content">
                                                <h4>Feeds</h4>
                                            </div>
                                            <div className="add-post">
                                                <Link to="/Dashboard/create_post">
                                                    <Button>Create Post</Button>
                                                </Link>
                                            </div>
                                        </div>
                                        {data && data.map((item, index) => (
                                            <div className="app-new-feeds-content-box" key={item.id}>
                                                {editingPostId === item.id ? (
                                                    <EditPost post={item} onCancelEdit={handleCancelEdit} />
                                                ) : (
                                                    <div>
                                                        {/* Render other content */}
                                                        <div className="person-info">
                                                            <div class="person-inf0-deatils">
                                                                <ul>
                                                                    <li>
                                                                        <img src={person} />
                                                                    </li>
                                                                    <li>{item.user.first_name}    {item.user.last_name}
                                                                        <span>
                                                                            <h5>MLA</h5>
                                                                            <h6>BRS</h6>
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                                <div class="person-info-content">
                                                                    <h4>{item.title}</h4>
                                                                    <p>{item.description}</p>
                                                                    <p>{item.address}{new Date(item.updatedAt).toDateString()}</p>
                                                                </div>
                                                            </div>

                                                            <ul className="menu-dots">
                                                                <li>
                                                                    <div className="dropdown">
                                                                        <button className="dropbtn">
                                                                            <img src={dots} alt="dots" />
                                                                        </button>
                                                                        <div className="dropdown-content">
                                                                            <a><Button onClick={() => handleClickEdit(item.id)}>Edit</Button></a>
                                                                            <a><Button onClick={() => handleDelete(item.id)}>Delete</Button></a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="post-image">
                                                            <img src={item.image} />
                                                            {/* <div class="post-image-buttons">
                                                                <div class="post-buttons-1">
                                                                    <ul>
                                                                        <li>
                                                                            <img src={like} />
                                                                            <span>{item.like}Like</span>
                                                                        </li>
                                                                        <li>
                                                                            <img src={comment} />
                                                                            <span>Comments</span>
                                                                        </li>
                                                                        <li>
                                                                            <img src={repost} />
                                                                            <span>Repost</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="post-image-buttons-2">
                                                                <ul>
                                                                    <li>
                                                                        <img src={share} />
                                                                        <span>Share</span>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </Grid>
                                    <Grid item xs={6} lg={6}>
                                        <Opinion />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default MainFeeds;





