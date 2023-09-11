import { Button, Grid } from "@mui/material";
import Feeds from "../components/Feeds";
import api from "../utils/api"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


function EditScheme(schemedata) {
    const token = localStorage.getItem("token")
    console.log({schemedata})
    // const [tags, setTags] = useState("");

    const [title, setTitle] = useState(schemedata.title);

    const [pincode, setPinCode] = useState(schemedata.pincode);

    const [city, setCity] = useState(schemedata.city);

    const [state, setState] = useState(schemedata.state);

    const [description, setDescription] = useState(schemedata.description)

    const [image, setImage] = useState(schemedata.image);

    useEffect(() => {
        setTitle(schemedata.schemedata.title);
        setPinCode(schemedata.schemedata.pincode)
        setCity(schemedata.schemedata.city)
        setState(schemedata.schemedata.state)
        setDescription(schemedata.schemedata.description)
        setImage(schemedata.schemedata.image)

    }, [schemedata]);

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

    const handleEditScheme = async () => {

        const formData = new FormData();
        formData.append("image", image);
        // formData.append("tags", tags);
        formData.append("title", title);
        formData.append("city", city);
        formData.append(" state", state);
        formData.append("pincode", pincode);
        formData.append("description", description);

        try {
            const response = await api.put(`schemas/${schemedata.schemedata.id}/`, formData);
            if (response) {
                toast.success("Schemes successfully updated!")
                window.location.reload()
                fetcScheme()
            }
            setImage(null);
            setTitle("");
            setDescription("");
            setPinCode("");
            setCity("");
            setState("");
            if (fileInputRef && fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    const handleCancel = () => {
        window.location.reload();
    };


    return (
        <>
            <div className="app-page-home">

                <div className="app-component-reportcard">
                    <div className="app-new-feeds">
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
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
                                        <Button onClick={handleEditScheme}>Update Scheme</Button>
                                        <Button onClick={handleCancel}>Cancel</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div >
        </>
    )
}

export default EditScheme;