import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import './OrderFilter.css';

const OrderFilter = ({ orders }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredOrders = filterData(searchQuery, orders);
    const navigate = useNavigate();

    const handleRedirect = (orderId) => {
        navigate(`/orders/${orderId}`)
    };

    return (
        <div className="search-bar">
            <Autocomplete style={{width:"30%"}}
                id="search-bar"
                disablePortal 
                options={filteredOrders.map(order => order.orderId)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
                onChange={(event, value) => {
                    if (value) {
                        handleRedirect(value); 
                    }
                }}
            />
        </div>
    );
};
export default OrderFilter;
const filterData = (query, data) => {
    if (!query) {
        return [];
    } else {
        return data.filter((order) => order.orderId.toLowerCase().includes(query.toLowerCase()));
    }
};