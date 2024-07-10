import React, { useEffect, useState } from "react";
import "./allstudents.css";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
// import StudentList from "../../components/StudentList";
import AllStudentList from "../../components/Allstudents";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {refreshSidebarfun } from "../../features/refreshSlice";

const Allstudents = () => {
  const [Students, setStudents] = useState([]);
  const [checked, setChecked] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentKey);
  const refresh = useSelector((state)=>state.refreshKey);
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_URL}/student/`);
      setStudents(response.data.response);
      setLoading(false);
    };
    fetchAllStudents();
    // console.log(studentData,"hi stu")
  }, [refresh]);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_DEPLOYMENT_URL}/mentor/addStudents`,
        {
          students: studentData.studentData,
          mentorId: mentor._id,
        }
      );
      console.log(response, "hi res");
      if (response.status === 200) {
        dispatch(refreshSidebarfun());
        toast.success("students added successfully");
        setChecked([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="allstudents-container">
      <div className="allstudents-title">
        <h1>List of All Students</h1>
      </div>
      <Box
        sx={{
          marginTop: "35px",
          display: "flex",
          justifyContent: "center",
          flex: "1",
        }}
      >
        <TextField
          type="search"
          id="search"
          label="Search"
          sx={{ width: 600 }}
        />
      </Box>
      <div className="allstudent-list">
        {loading ? <div className="circular-progress"><CircularProgress/></div>: 
        <AllStudentList Students={Students} checked={checked} setChecked={setChecked} />
        }
      </div>
      <Box
        sx={{
          color: "black",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Button
          sx={{ background: "#5c5470", color: "white",marginBottom:"25px" }}
          onClick={handleCreate}
          disabled={loading}
        >
          Add Students
        </Button>
      </Box>
    </div>
  );
};

export default Allstudents;
