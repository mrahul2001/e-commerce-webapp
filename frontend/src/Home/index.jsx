import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';


import Cards from '../Components/Home/Cards';
import NavBar from '../Components/NavBar';
import ApplyFilter from '../Components/Products/ApplyFilter';
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/products/find', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setProducts(response.data.data.data);
                setFilteredProducts(response.data.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const applyFilter = (filterParams) => {
        const filtered = products.filter(product => {
            const productNameMatch = filterParams.productName ? product.productName.toLowerCase().includes(filterParams.productName.toLowerCase()) : true;
            const availabilityMatch = isNaN(filterParams.availability) ? true : product.productAvailability === filterParams.availability;
            const priceMatch = isNaN(filterParams.price) ? true : product.productPrice <= filterParams.price;
            const ratingMatch = isNaN(filterParams.rating) ? true : product.productRating === filterParams.rating;

            return productNameMatch && availabilityMatch && priceMatch && ratingMatch;
        });
        setFilteredProducts(filtered);
    };

    return (
        <Box className="home-page">
            <ApplyFilter applyFilter={applyFilter} />
            <NavBar products={products} />
            <Cards products={filteredProducts} />
        </Box>
    );
}
