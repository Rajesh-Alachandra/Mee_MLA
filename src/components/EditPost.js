import React, { useState, useEffect, useRef } from "react";
import { Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function EditPost({ post }) {

  const navigate = useNavigate

  console.log(post)
  const [title, setTitle] = useState(post.title);
  // const [tags, setTags] = useState(post.tags);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image);

  let fileInputRef = useRef(post.image);

  useEffect(() => {
    console.log(post)
    setTitle(post.title);
    // setTags(post.tags);
    setImage(post.image)
    setDescription(post.description);
  }, [post]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    // formData.append("tags", tags);
    formData.append("title", title);
    formData.append("description", description);

    const { data, status } = await api.put(`posts/${post.id}/`, formData);
    if (status === 200) {
      toast.success("Post successfully updated!");
      window.location.reload()
    } else {
      toast.error("Error updating post.");
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
                    <h4>Edit Post</h4>
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
                        <input
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          type="text"
                          className="input-form"
                          id=""
                          placeholder="@kishore"
                        ></input>
                      </div> */}
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          className="input-form"
                          id=""
                          placeholder="Title"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-form-2"
                        rows="5"
                        placeholder="Please share what you’re thinking"
                      ></textarea>
                    </div>
                  </div>
                  <div className="create-post-button">
                    <Button onClick={handleEditPost}>Update Post</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
