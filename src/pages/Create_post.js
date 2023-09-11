import { Button, Grid } from "@mui/material";
import Feeds from "../components/Feeds";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api"
import { useNavigate } from "react-router-dom";




function Create_post() {

    const navigate = useNavigate("")


    const [title, setTitle] = useState("")
    // const [tags, setTags] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    // const [selectedFile, setSelectedFile] = useState(null);
    let fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setSelectionFile(file)
        setImage(file)
    };


    const handlepost = async (e) => {
        e.preventDefault()


        const formData = new FormData();
        formData.append("image", image);
        // formData.append("tags", tags);
        formData.append("title", title);
        formData.append("description", description);


        const { data, status } = await api.post("posts/", formData)
        if (data) {
            toast.success("Posts successfully created!")
            navigate("/Dashboard/Mainfeeds")
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else {
            toast.error()
        }
        setImage(null)
        setTitle("")
        // setTags("")
        setDescription("")
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
                                        <div className="app-component-reportcard">
                                            <div className="app-component-reportcard__head">
                                                <h4>Create Post</h4>
                                            </div>
                                            <div className="app-component-reportcard__count">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        ref={(input) => (fileInputRef = input)}
                                                        className="input-form"
                                                        id=""
                                                    />
                                                </div>
                                                <div className="select-tags">
                                                    {/* <div className="form-group">
                                                        <label>Tag</label>
                                                        <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" className="input-form" id="" placeholder="@kishore" ></input>
                                                    </div> */}
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input-form" id="" placeholder="Title" ></input>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-form-2" rows="5" placeholder="Please share what you’re thinking"></textarea>
                                                </div>
                                            </div>
                                            <div className="create-post-button">
                                                <Button onClick={handlepost}>Create Post</Button>
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

export default Create_post;