import { Button, Grid } from "@mui/material";
import Feeds from "../components/Feeds";
import api from "../utils/api"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Create_scheme() {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [tags, setTags] = useState("");

    const [title, setTitle] = useState("");

    const [pincode, setPinCode] = useState("");

    const [city, setCity] = useState("");

    const [state, setState] = useState("");

    const [description, setDescription] = useState("")

    const [image, setImage] = useState(null);



    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    let fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setSelectionFile(file)
        setImage(file)
    };

    console.log(data)

    const fetcScheme = async () => {
        try {
            const response = await api.get("schemas")
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetcScheme()
    }, [])

    const postScheme = async () => {

        const formData = new FormData();
        formData.append("image", image);
        formData.append("tags", tags);
        formData.append("pincode", pincode);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("title", title);
        formData.append("description", description);

        try {
            const response = await api.post("schemas/", formData)
            if (response) {
                toast.success("Schemes successfully created!")
                navigate("/Dashboard/govt_schemes")
            }
            setImage(null);
            setTitle("");
            setDescription("");
            setPinCode("");
            setCity("");
            setState("");
            setTags("")
            if (fileInputRef && fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
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
                                                <h4>Create Scheme</h4>
                                            </div>
                                            <div className="app-component-reportcard__count">
                                                <div className="form-group">
                                                    <label>Select Upload</label>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        ref={(input) => (fileInputRef = input)}
                                                        className="input-form"
                                                        id=""
                                                    />
                                                </div>
                                                <div className="select-tags">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input-form" id="" placeholder="Title" ></input>
                                                    </div>
                                                </div>
                                                {/* <div className="select-tags">
                                                    <div className="form-group">
                                                        <label>Tag</label>
                                                        <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" className="input-form" id="" placeholder="@kishore" ></input>
                                                    </div>
                                                </div> */}
                                                <div className="form-group">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <label>Pin Code</label>
                                                            <input value={pincode} onChange={(e) => setPinCode(e.target.value)} type="text" className="input-form" id="" placeholder="Enter Code"></input>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <label>City</label>
                                                            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="input-form" id="" placeholder="Enter City"></input>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="form-group">
                                                    <label>State</label>
                                                    <input value={state} onChange={(e) => setState(e.target.value)} type="text" className="input-form" id="fname" placeholder="Enter State"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="" className="input-form-2" rows="5" placeholder="Please share what you’re thinking"></textarea>
                                                </div>
                                            </div>
                                            <div className="create-post-button">
                                                <Button onClick={postScheme}>Create Scheme</Button>
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
            </div >
        </>
    )
}

export default Create_scheme;