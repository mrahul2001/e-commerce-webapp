import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import './ProductPage.css'

function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    async function fetchProductById() {
        try {
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            setProduct(response.data.data.data[0])
        } catch (error) {
            console.error('No Details', error);
        }
    }

    const handleGoBack = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchProductById();
    }, []);

    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div className="product-page-container">

                <div className="product-image-container">
                    <img className="product-image" src={product.products_productImage} alt="Product" />
                    <div className="product-details">
                        <h2 className="product-name">{product.products_productName}</h2>
                        <p className="product-price">Price: ₹ {product.products_productPrice}</p>
                        <p className="product-availability">In Stock: {product.products_productAvailability}</p>
                        <p className="product-rating">Rating: {product.products_productRating}/5</p>
                    </div>
                </div>

                <div className="product-description">
                    <h3>Description</h3>
                    <p>{product.products_productDescription}</p>
                </div>

            </div>

            <Button className="back-button" variant="contained" onClick={handleGoBack}>Back to Home</Button>

        </>

    );
}

export default ProductPage;
