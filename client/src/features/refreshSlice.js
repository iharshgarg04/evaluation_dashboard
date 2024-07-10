import { createSlice } from "@reduxjs/toolkit";

export const refreshSidebar = createSlice({
    name:"refreshSidebar",
    initialState:true,
    reducers:{
        refreshSidebarfun:(state)=>{
            console.log("refreshing sidebar")
            return !state
        }
    }
})

export const { refreshSidebarfun } = refreshSidebar.actions;
export default refreshSidebar.reducer;