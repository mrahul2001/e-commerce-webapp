import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import axios from 'axios';
import SingleOrder from '../Components/Orders/SingleOrder';
import NavBar from '../Components/NavBar';
import OrderFilter from '../Components/Orders/OrderFilter';
import './Order.css';

export default function BasicList() {
  const [getOrders, setGetOrders] = useState([]);

  const displayOrders = async (e) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/orders/find',
        headers: {
          'Authorization': "Bearer " + token,
          "Content-Type": "application/json"
        },
        data: {}
      });
      setGetOrders(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayOrders();
  }, [])
  return (
    <div className='order-page'>
      <NavBar />
      <div className='order-page'>
        <OrderFilter orders={getOrders} />
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'inherit' }} className='order-box'>
          <nav aria-label="main mailbox folders">
            <List>
              {getOrders.map((order, index) => (
                <div key={index}>
                  <SingleOrder order={order} />
                </div>
              ))}
            </List>
          </nav>
        </Box>
      </div>
    </div>
  );
}