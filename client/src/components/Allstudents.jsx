import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import  { setStudentData } from '../features/student';

const AllStudentList = ({Students,checked,setChecked}) => {
    const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    dispatch(setStudentData(newChecked));
    // setChecked([]);
    console.log(newChecked,"hii checked")
  };

const unassingedStudents = Students.filter((student)=> student.assigned ===false);
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {unassingedStudents.length===0 ? <p style={{textAlign:"center"}}>No more student available to be assigned</p>:
      unassingedStudents.map((value,index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{backgroundColor:"#dbd8e3",color:"black",borderRadius:"10px",padding:"10px 40px"}}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default AllStudentList