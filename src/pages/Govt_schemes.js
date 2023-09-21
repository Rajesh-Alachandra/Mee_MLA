import { Button, Grid } from "@mui/material";
import ReportedCard from "../components/ReportedCard";
import Annoncement from "../components/Annoncement";
import person from '../Icons/person.svg';
import dots from '../Icons/dots.svg';
import post1 from '../images/mp-lands/post-1.svg';
import post2 from '../images/mp-lands/post-2.svg';
import like from '../Icons/like.svg';
import comment from '../Icons/comment.svg';
import repost from '../Icons/re-post.svg';
import share from '../Icons/share.svg';
import { useEffect, useState } from "react";
import api from "../utils/api"
import { Link } from "react-router-dom";
import Opinion from "./Opinion";
import EditScheme from "../components/EditScheme";


function Govt_schemes() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    console.log(data)

    const fetcScheme = async () => {
        try {
            const response = await api.get("schemas/")
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };
    const handleClickEdit = (postId) => {
        setEditingPostId(postId);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };
    const handleDelete = async (itemId) => {

        try {

            await api.delete(`schemas/${itemId}`);

            fetcScheme()

        } catch (error) {

            console.error('Error deleting item:', error);

        }

    }

    useEffect(() => {
        fetcScheme()
    }, [])

    return (
        <>
            <div className="app-page-home">
                <Grid container spacing={2}>
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <div className="new-feeds-content">
                                            <div className="feeds-top-content">
                                                <h4>Schemes</h4>
                                            </div>
                                            <div className="add-post">
                                                <Link to="/Dashboard/Create_scheme"> <Button >Add Scheme</Button></Link>
                                            </div>
                                        </div>
                                        {data && data.map((item, index) => {
                                            console.log(item)
                                            return (
                                                <div className="app-new-feeds-content-box">
                                                     {editingPostId === item.id ? (
                                                    <EditScheme schemedata={item}  />
                                                ) : (
                                                    <div className="app-new-feeds-box-content">
                                                        <div key={index} className="person-info">
                                                            <div class="person-inf0-deatils">
                                                                <ul>
                                                                    <li>
                                                                        <img src={person} />
                                                                    </li>
                                                                    <li>{item.user.first_name}
                                                                        <span>
                                                                            <h5>MLA</h5>
                                                                            <h6>TRS</h6>
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                                <div class="person-info-content">
                                                                    <h4>{item.title}</h4>
                                                                    {/* <div className="elegibility">
                                                                        <ul>
                                                                            <li>Elegibility for the MPLADS</li>
                                                                            <li>Elegibility for the MPLADS</li>
                                                                            <li>Elegibility for the MPLADS</li>
                                                                        </ul>
                                                                    </div> */}
                                                                    <p>{item.state} {new Date(item.updatedAt).toDateString()}</p>
                                                                </div>
                                                            </div>
                                                            <ul className="menu-dots">
                                                                <li>
                                                                    <div class="dropdown">
                                                                        <button class="dropbtn">
                                                                            <img src={dots} />
                                                                        </button>
                                                                        <div class="dropdown-content">
                                                                           <a><Button onClick={() => handleClickEdit(item.id)}>Edit</Button></a> 
                                                                           <a><Button onClick={() => handleDelete(item.id)}>Delete</Button></a> 
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="post-image">
                                                            <img src={item.image} />
                                                        </div>
                                                    </div>
                                                )}
                                                </div>
                                            )
                                        })}
                                    </Grid>

                                    {/* <Grid item xs={6} lg={6}>
                                        <Opinion />
                                    </Grid> */}
                                </Grid>
                            </div>
                        </div>

                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default Govt_schemes;