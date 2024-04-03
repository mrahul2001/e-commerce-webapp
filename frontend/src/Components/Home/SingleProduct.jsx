import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Cards.css';

const SingleProduct = ({ product }) => {
    const navigate = useNavigate();

    const openDescription = () => {
        if (product.id) {
            navigate(`/products/${product.id}`);
        } else {
            console.error("Product ID is undefined");
        }
    }

    return (
        <div>
            <Card className="card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img" 
                    image={product.productImage}
                    alt={product.productName} 
                    sx={{ height: 140, objectFit: 'contain' }} 
                />
                <CardContent className="card-content">
                    <Typography gutterBottom variant="h5" component="div">
                        {product.productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className='text'>
                        {product.productDescription}
                    </Typography>
                </CardContent>
                <CardActions className='buttonss'>
                    <Button size="small">Add To Cart</Button>
                    <Button size="small" onClick={openDescription}>Description</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default SingleProduct;
