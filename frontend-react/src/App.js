import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import logo from './images/kaba.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <img src={logo} alt="logo" />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default App;
