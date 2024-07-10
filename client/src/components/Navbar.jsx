import React from 'react'
import '../App.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate();
  const mentorData=localStorage.getItem("mentorData");
  return (
    <div className='Nav-header'>
        <div className='nav-mentor'>
            MentorView
        </div>
        {mentorData &&
          <Button sx={{color:"white",backgroundColor:"grey" , '&:hover':{
            backgroundColor:"black"
          }}} variant='contained' onClick={()=>{
            navigate("/");
            localStorage.removeItem("mentorData");
          }}>
            LogOut
          </Button>
        }
    </div>
  )
}

export default Navbar