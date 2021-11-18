import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import logo from './images/kaba.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar src={logo} alt="logo" sx={{ width: 120, height: 110 }} />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Fibonacci Heap"
            subheader="23521059 - 23521089"
          />
        </Card>
      </div>
    </div>
  );
}

export default App;
