import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

import './ApplyFilter.css'

const ApplyFilter = ({ applyFilter }) => {
    const [productName, setProductName] = useState('');
    const [availability, setAvailability] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');

    const handleApplyFilter = () => {
        applyFilter({
            productName: productName.trim(),
            availability: parseInt(availability),
            price: parseFloat(price),
            rating: parseInt(rating)
        });
    };

    const handleClearFilter = () => {
        setProductName('');
        setAvailability('');
        setPrice('');
        setRating('');
        window.location.reload();
    };

    return (
        <Box className="filter-box">
            <TextField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                variant="outlined"
                sx={{ marginRight: '1rem' }}
            />
            <TextField
                label="Availability"
                type="number"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                variant="outlined"
                sx={{ marginRight: '1rem' }}
            />
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                sx={{ marginRight: '1rem' }}
            />
            <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                variant="outlined"
                sx={{ marginRight: '1rem' }}
            />
            <Button variant="contained" onClick={handleApplyFilter} sx={{ marginRight: '1rem' }}>Apply Filter</Button>
            <Button variant="contained" onClick={handleClearFilter}>Clear Filter</Button>
        </Box>
    );
};

export default ApplyFilter;
