import React, { useContext, useEffect } from "react";
import "../App.css";
import { myContext } from "../pages/dashboard/Dashboard";
import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Marksheet = () => {
  const { student, setStudent } = useContext(myContext);
  const [marksheet, setMarksheet] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DEPLOYMENT_URL}/student/fetchMarks`,
          {
            headers: {
              student: student._id,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setMarksheet(response.data.student);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchMarks();
  }, [student]);
  return (
    <div className="marksheet-container">
    <div className="marksheet-box">
      <div>
        <h2>Marksheet</h2>
      </div>
      {loading ? <CircularProgress className="circular-progress" /> : 
      <div className="marks-list">
        <p>Viva : {marksheet ?  marksheet.viva: "NA"}</p>
        <p>Ideation : {marksheet ?  marksheet.ideation: "NA"}</p>
        <p>Execution : {marksheet ?  marksheet.execution: "NA"}</p>
        <p>Project Management : {marksheet ?  marksheet.projectManagement: "NA"}</p>
        <p>Team Work : {marksheet ?  marksheet.teamWork: "NA"}</p>
        <p>Total Marks : {marksheet ?  marksheet.totalMarks: "NA"}</p>
      </div>
      }
    </div>
    <p className="add-marks-text">
      Click on the edit icon to edit or add marks for the student.
    </p>
  </div>
  );
};

export default Marksheet;
