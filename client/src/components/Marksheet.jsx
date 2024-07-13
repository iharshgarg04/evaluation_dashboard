import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { myContext } from "../pages/dashboard/Dashboard";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Marksheet = () => {
  const { student } = useContext(myContext);
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
console.log(marksheet)
  return (
    <div className="marksheet-container">
      <div className="marksheet-box">
        <div>
          <h2>Marksheet</h2>
        </div>
        {loading ? (
          <CircularProgress className="circular-progress" />
        ) : (
          <div className="marks-list">
            <p>Viva : {marksheet.viva ? marksheet.viva.marks : "NA"}</p>
            <p>Ideation : {marksheet.ideation ? marksheet.ideation.marks : "NA"}</p>
            <p>Execution : {marksheet.execution ? marksheet.execution.marks : "NA"}</p>
            <p>Project Management : {marksheet.projectManagement ? marksheet.projectManagement.marks : "NA"}</p>
            <p>Team Work : {marksheet.teamWork ? marksheet.teamWork.marks : "NA"}</p>
            <p>Total Marks : {marksheet.totalMarks ? marksheet.totalMarks.marks : "NA"}</p>
          </div>
        )}
      </div>
      <p className="add-marks-text">
        Click on the edit icon to edit or add marks for the student.
      </p>
    </div>
  );
};

export default Marksheet;
