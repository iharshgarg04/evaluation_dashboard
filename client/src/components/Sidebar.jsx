import { Backdrop, Button, CircularProgress, Icon, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentList from "./StudentList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const Sidebar = () => {
  const [mystudents, setMystudents] = useState([]);
  const [markstudent, setMarkstudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DEPLOYMENT_URL}/student/myStudents`,
          {
            headers: {
              mentor: mentor._id,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setMystudents(response.data.student);
          console.log(response, "hii students");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);



  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_DEPLOYMENT_URL}/mentor/submit`,
        {
          mentorId: mentor._id,
        }
      );
      if (response.status === 200) {
        console.log(response);
        setMarkstudent(response.data.studentMarks);
        toast.success("marks locked successfully");
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="sidebar-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="sidebar-header">
        <h2>{mentor.name}</h2>
        <div>
          <Button
            sx={{ color: "black", fontSize: "16px", fontWeight: "600" }}
            onClick={() => {
              navigate("Allstudents");
            }}
          >
            Add
          </Button>
          <Button
            sx={{ color: "black", fontSize: "16px", fontWeight: "600" }}
            onClick={() => navigate("view")}
          >
            view
          </Button>
        </div>
      </div>
      <div className="sidebar-header-title">My students</div>
      {mystudents.length === 0 ? (
        <p className="no-student-text">
          No students added yet click on Add button to start grading students
        </p>
      ) : (
        <StudentList mystudents={mystudents} />
      )}
      <div
        style={{
          flex: "1.3",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#31363F",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
          onClick={()=>{
        
            handleSubmit();
          }}
          disabled={loading}
        >
          Submit grading
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
