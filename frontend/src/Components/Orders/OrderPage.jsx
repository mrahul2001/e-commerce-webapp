import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

import './OrderPage.css'

function generateInvoice(order) {
  // Format order details as string
  const orderDetails = Object.entries(order.orderDetails)
    .map(([product, quantity]) => `${product}: ${quantity}`)
    .join('\n');

  // Generate invoice content
  const invoiceContent = `
ORDER ID: ${order.orderId}
ORDER DETAILS:
${orderDetails}
TOTAL AMOUNT: $${order.totalAmount}
PAYMENT METHOD: ${order.paymentMethod}
ORDER STATUS: ${order.orderStatus}
ORDER DATE: ${order.createdAt}
`;

  return invoiceContent;
}

function downloadInvoice(order) {
  const invoiceContent = generateInvoice(order);

  // Create a Blob containing the invoice content
  const blob = new Blob([invoiceContent], { type: 'text/plain' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice_${order.orderId}.txt`; // Set the filename for the downloaded file
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  async function fetchOrderById() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios({
        method: 'get',
        url: `http://localhost:3000/orders/${id}`,
        headers: {
          'Authorization': "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data.data.data);
      setOrder(response.data.data.data)
    } catch (error) {
      console.error('No Details', error);
    }
  }

  const handleDownloadInvoice = () => {
    downloadInvoice(order);
  };

  const handleGoBack = () => {
    navigate('/my-orders');
  }

  useEffect(() => {
    fetchOrderById();
  }, []);

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="invoice">
        <div className="header">
          <h2>Order Details</h2>
        </div>
        <div className="details">
          <p><strong>ORDER ID:</strong> {order.orderId}</p>
          <p><strong>ORDER DETAILS:</strong></p>
          <ul>
            {Object.entries(order.orderDetails).map(([product, quantity]) => (
              <li key={product}>{product} : {quantity}</li>
            ))}
          </ul>
          <p><strong>TOTAL AMOUNT:</strong> ₹ {order.totalAmount}</p>
          <p><strong>PAYMENT METHOD:</strong> {order.paymentMethod}</p>
          <p><strong>ORDER STATUS:</strong> {order.orderStatus}</p>
          <p><strong>ORDER DATE:</strong> {order.createdAt}</p>
        </div>
        <Stack spacing={2} direction="row">
          <Button className="back-button" variant="contained" onClick={handleGoBack}>Back to Home</Button>
          <Button className="back-button" variant="contained" onClick={handleDownloadInvoice}>Download Invoice</Button>
        </Stack>
      </div>
    </>


  );
}

export default OrderPage;
