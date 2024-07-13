import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { myContext } from "../pages/dashboard/Dashboard";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const marks = [
  {
    id: "viva",
    name: "viva",
    label: "viva",
  },
  {
    id: "ideation",
    name: "ideation",
    label: "ideation",
  },
  {
    id: "execution",
    name: "execution",
    label: "execution",
  },
  {
    id: "projectManagement",
    name: "projectManagement",
    label: "project Management",
  },
  {
    id: "teamWork",
    name: "teamWork",
    label: "team Work",
  },
];

const Marks = () => {
  const {student,setStudent} = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [marksval, setMarksval] = useState({
    viva:0,
    execution:0,
    projectManagement:0,
    teamWork:0,
    ideation:0,
  })
  const [files, setFiles] = useState({
    viva: "",
    execution: "",
    projectManagement: "",
    teamWork: "",
    ideation: "",
  });
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const handleChange = (e)=>{
    const { name, value } = e.target;
    const parsedValue = Math.max(0, Math.min(10, parseInt(value) || 0));
    setMarksval({
      ...marksval,
      [name]: parsedValue,
    });
  }

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
          const fetchedMarks = response.data.student;
          const initialMarksval = {
            viva: fetchedMarks ? fetchedMarks.viva.marks : 0,
            ideation: fetchedMarks ? fetchedMarks.ideation.marks : 0,
            execution: fetchedMarks ? fetchedMarks.execution.marks : 0,
            projectManagement: fetchedMarks ? fetchedMarks.projectManagement.marks : 0,
            teamWork: fetchedMarks ? fetchedMarks.teamWork.marks : 0,
          };
          setMarksval(initialMarksval);
          console.log("hiii",response);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchMarks();
  }, [student]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("studentId", student._id);
      formData.append("mentorId", mentor._id);
      formData.append("viva", marksval.viva);
      formData.append("ideation", marksval.ideation);
      formData.append("execution", marksval.execution);
      formData.append("projectManagement", marksval.projectManagement);
      formData.append("teamWork", marksval.teamWork);

      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      const response = await axios.post(
        `${process.env.REACT_APP_DEPLOYMENT_URL}/student/marksUpload`,
        formData,
      );
      
      if (response.status === 201) {
        toast.success("marks are saved successfully");
        setLoading(false);
      }
      console.log(response);
    } catch (error) {
      setLoading(false);
      if (!student) {
        toast.error("click on add Marks again to continue");
      } else if (error && error.response.status === 400) {
        toast.error("enter all fields Or you have already submitted the assignments");
      }
      console.log(error);
    }
  };

  const handleChangeFile = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFiles[0],
    }));
  };
  return (
    <div className="marks-container">
      <div className="marks-header">
        <div className="marks-title"> marks form</div>
        {loading ? <CircularProgress className="circular-progress"/> :
        marks.map((mark, index) => (
          <div className="marks-row">
            <FormControl sx={{width:"100%"}}>
              <InputLabel htmlFor={mark.id}>{mark.label}</InputLabel>
              <OutlinedInput
              required
                id={mark.id}
                placeholder="1-10"
                label={mark.label}
                type="number"
                name = {mark.id}
                value = {marksval[mark.id] ===0 ?'0' : marksval[mark.id]}
                onChange={handleChange} 
                inputProps={{
                  min: 0,
                  max: 10,
                  onInput: (e) => {
                    e.target.value = Math.max(0, Math.min(10, parseInt(e.target.value) || 0));
                  }
                }}
              />
            </FormControl>
            <input type="file" name={mark.id} onChange={handleChangeFile} />
              {files[mark.id] && <p>{files[mark.id].name}</p>}
          </div>
        ))
        }
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", padding: "10px 50px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Marks;
