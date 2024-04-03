import React from 'react';
import { Button } from '@mui/material';

import "./OrderDetails.css"

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

const OrderDetails = ({ order }) => {

    const handleDownloadInvoice = () => {
        downloadInvoice(order);
    };

    return (
        <div>
            <p>ORDER ID: {order.orderId}</p>
            <p>ORDER DETAILS: </p>
            <div>
                {Object.entries(order.orderDetails).map(([product, quantity]) => (
                    <p>{product} : {quantity}</p>
                ))}
            </div>
            <p>TOTAL AMOUNT: {order.totalAmount}</p>
            <p>PAYMENT METHOD: {order.paymentMethod}</p>
            <p>ORDER STATUS: {order.orderStatus}</p>
            <p>ORDER DATE: {order.createdAt}</p>
            <Button className="download-button" variant="contained" onClick={handleDownloadInvoice} >Download Invoice</Button>
        </div>
    )
}

export default OrderDetails
