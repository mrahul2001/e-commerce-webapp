import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './AddAddress.css'

const AddAddres = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/user/add-address',
          headers: {
              'Authorization': "Bearer " + token,
              "Content-Type": "application/json"
          },
          data: formData
      });
      setOpenDialog(true);    
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/'); 
  };

  return (
    <div className='signin-container'>
      <h1>Add Shipping Address</h1>
      <Stack spacing={2}>
        <TextField label="New Shipping Address" variant="outlined" name="shippingAddress" id="passhippingAddresssword" onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Stack>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Address Added</DialogTitle>
        <DialogContent>
          <p>{formData.shippingAddress}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddAddres;
