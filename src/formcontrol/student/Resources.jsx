import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Layout from "../../content/NavbarSidenavLayout";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";

const Resource = () => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("ResourceLogos/icon.jpg");
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAddLink, setShowAddLink] = useState(false); // State to toggle showing add link form
  const [links, setLinks] = useState([{ title: "", url: "" }]);
  const [imgUrls, setImgUrls] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [openResourceDialog, setOpenResourceDialog] = useState(false);

  useEffect(() => {
    if (!openDialog) {
      setName("");
      setImgUrl("ResourceLogos/icon.jpg");
      setLinks([{ title: "", url: "" }]);
    }
  }, [openDialog]);

  useEffect(() => {
    const fetchImgUrls = async () => {
      try {
        const response = await axios.get("http://localhost:8081/resources");
        setImgUrls(response.data);
      } catch (error) {
        console.error("Error fetching imgUrls:", error.message);
      }
    };

    fetchImgUrls();
  }, []);

  const handleImageClick = (resource) => {
    setSelectedResource(resource);
    setLinks(resource.links || []);
    setOpenResourceDialog(true); // Open resource dialog when an image is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/resources", {
        name,
        imgUrl,
        links,
      });

      console.log(response.data);

      setOpenDialog(false);
      setName("");
      setImgUrl("ResourceLogos/icon.jpg");
      setLinks([{ title: "", url: "" }]);
    } catch (error) {
      console.error("Error creating resource:", error.message);
    }
  };

  const handleAddResource = () => {
    setSelectedResource(null);
    setName("");
    setImgUrl("ResourceLogos/icon.jpg");
    setLinks([{ title: "", url: "" }]);
    setOpenDialog(true);
  };

  const handleAddLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleUpdate = async () => {
    try {
      if (selectedResource) {
        const response = await axios.put(
          `http://localhost:8081/resources/${selectedResource._id}`,
          {
            name,
            imgUrl,
            links,
          }
        );

        console.log(response.data);
        // Handle successful resource update here
      }
    } catch (error) {
      console.error("Error updating resource:", error.message);
      // Handle resource update error here
    }
  };
  const handleDelete = async () => {
    try {
      if (selectedResource) {
        await axios.delete(
          `http://localhost:8081/resources/${selectedResource._id}`
        );

        console.log("Resource deleted");
        // Handle successful resource deletion here
        setSelectedResource(null);
      }
    } catch (error) {
      console.error("Error deleting resource:", error.message);
      // Handle resource deletion error here
    }
  };

  const SelectedResourceDialog = ({
    open,
    resource,
    onClose,
    onUpdate,
    onDelete,
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            padding: "20px",
            border: "20px solid #B360EE",
            borderRadius: "10px",
          },
        }}
      >
        {resource && (
          <>
            <DialogTitle>{resource.name}</DialogTitle>
            <DialogContent>
              <Grid container direction="column" spacing={2}>
                {resource.links.map((link, index) => (
                  <Grid item key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(link.url, "_blank")}
                      fullWidth
                    >
                      {link.title}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onDelete} variant="contained" color="secondary">
                Delete
              </Button>
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  };

  return (
    <Layout>
      <h1>Resources</h1>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            border: "30px solid #B360EE",
          },
        }}
      >
        <DialogTitle>Add Resource</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Resource Name"
              margin="dense"
              fullWidth
            />
            <TextField
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              label="Image URL"
              margin="dense"
              fullWidth
            />
            {links.map((link, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <TextField
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(index, "title", e.target.value)
                  }
                  label="Link Title"
                  margin="dense"
                  fullWidth
                />
                <TextField
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  label="Link URL"
                  margin="dense"
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveLink(index)}
                >
                  Remove Link
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddLink}
              variant="contained"
              color="primary"
              style={{ marginBottom: "16px" }}
              fullWidth
            >
              Add Link
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Resource
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button
              onClick={handleAddResource}
              variant="contained"
              color="primary"
            >
              Add Resource
            </Button>
          </div>
          <Paper
            style={{
              padding: "20px",
              display: showAddLink ? "block" : "none",
              marginBottom: "16px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Resource Name"
                margin="dense"
                fullWidth
              />
              <TextField
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                label="Image URL"
                margin="dense"
                fullWidth
              />
              {links.map((link, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <TextField
                    value={link.title}
                    onChange={(e) =>
                      handleLinkChange(index, "title", e.target.value)
                    }
                    label="Link Title"
                    margin="dense"
                    fullWidth
                  />
                  <TextField
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                    label="Link URL"
                    margin="dense"
                    fullWidth
                  />
                </div>
              ))}
              <Button
                onClick={handleAddLink}
                variant="contained"
                color="primary"
                style={{ marginBottom: "16px" }}
                fullWidth
              >
                Add Link
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Resource
              </Button>
            </form>
          </Paper>
        </Grid>
        <h3>Select Required Resource</h3>
        <Grid item xs={12}>
          <Paper style={{ padding: "20px", marginBottom: "20px" }}>
            <Grid container spacing={2}>
              {imgUrls.map((resource) => (
                <Grid item xs={4} key={resource._id}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={resource.imgUrl}
                      name={resource.name}
                      alt={`img-url-${resource._id}`}
                      onClick={() => handleImageClick(resource)}
                      style={{ cursor: "pointer" }}
                    />
                    <Typography variant="body1" gutterBottom>
                      {resource.name}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
            <SelectedResourceDialog
              open={openResourceDialog}
              resource={selectedResource}
              onClose={() => setOpenResourceDialog(false)}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Resource;
