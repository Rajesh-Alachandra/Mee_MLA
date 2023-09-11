import { Button, Grid } from "@mui/material";
import Feeds from "../components/Feeds";
import api from "../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Create_announcement() {

    const navigate = useNavigate();


    const [announcement, setAnnouncement] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const postAnnouncement = async (e) => {
        e.preventDefault();

        const formData = {
            announcement,
            title,
            description,
        };

        try {
            const { data, status } = await api.post("annocements/", formData);
            if (data) {
                toast.success("Announcement Created successfully");
            } else {
                toast.error("Failed to create Announcement");
            }
            setAnnouncement("");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating Announcement:", error);
            toast.error("An error occurred while creating Announcement");
        }
    };



    return (
        <>
            <div className="app-page-home">
                <Grid container spacing={2}>
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} lg={6}>
                                        <div className="app-component-reportcard">
                                            <div className="app-component-reportcard__head">
                                                <h4>Create Announcement</h4>
                                            </div>
                                            <div className="app-component-reportcard__count">
                                                <div className="form-group">
                                                    <label>Select Upload</label>
                                                    <input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} type="text" className="input-form" placeholder="Create Announcement" ></input>
                                                </div>
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input-form" id="" placeholder="MLANDS" ></input>
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="" className="input-form-2" rows="5" placeholder="Please share what you’re thinking"></textarea>
                                                </div>
                                            </div>
                                            <div className="create-post-button">
                                                <Button onClick={postAnnouncement}>Create Announcement</Button>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} lg={6}>
                                        <div className="app-page-home__feeds">
                                            <Feeds />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Create_announcement;