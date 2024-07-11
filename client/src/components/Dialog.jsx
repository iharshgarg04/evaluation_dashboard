import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";

const DialogContainer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const initial = {
    name: "",
    email: "",
  };

  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData, "hii initial");
      setLoading(true);
      const postStudent = await axios.post(
        `${process.env.REACT_APP_DEPLOYMENT_URL}/student/CreateNewStudent`,
        formData
      );
      console.log(postStudent);
      if (postStudent.request.status === 200) {
        handleClose();
        toast.success("Student Added successfully");
        setLoading(false);
      }
    } catch (error) {
        setLoading(false);
      toast.error(error.message);
      console.log(error, error);
      console.log("Error while Adding student");
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new Student please enter the name and email of the student.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogContainer;
