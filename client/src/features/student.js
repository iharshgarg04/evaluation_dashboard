import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentData: [],
  };

export const studentSlice = createSlice({
    name :"student",
    initialState:initialState,
    reducers:{
        setStudentData(state,value){
            state.studentData = value.payload
        }
    }
})

export const { setStudentData } = studentSlice.actions;
export default studentSlice.reducer;