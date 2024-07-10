import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const AllStudentList = ({Students,checked,setChecked}) => {

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked,"hii checked")
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {Students.length===0 ? <p style={{textAlign:"center"}}>No more student available to be assigned</p>:
      Students.map((value,index) => {
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