import React, { useContext, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { myContext } from "../pages/dashboard/Dashboard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { refreshSidebarfun } from "../features/refreshSlice";

const StudentList = ({ mystudents }) => {
  const { student, setStudent } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const handleDelete = async(student) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_DEPLOYMENT_URL}/mentor/removestudent`,
        {
          mentorId: mentor._id,
          studentId: student._id,
        }
      );
      if (response.status === 200) {
        toast.success("student removed successfully");
        dispatch(refreshSidebarfun());
        setLoading(false);
      }
      console.log(response);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
    <div className="sidebar-list">
      {mystudents.map((stu, index) => (
        <div
          key={index}
          className="student-sidebar-list"
          onClick={() => {
            setStudent(stu);
            navigate("marks");
          }}
        >
          {stu.name}
          <div className="student-sidebar-icons">
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                  color: "black !important",
                  zIndex:"2"
                },
              }}
              onClick={(e)=>{
                e.stopPropagation();
                setStudent(stu);
                navigate("editOrAdd")
              }}
            >
              <EditNoteIcon />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                  color: "black !important",
                  zIndex:"20"
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
               { mystudents.length>3 ? handleDelete(stu): toast.error("AtLeast 3 stundets are required")}
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default StudentList;
