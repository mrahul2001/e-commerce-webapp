import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import NavBar from '../NavBar';
import SingleProduct from './SingleProduct';
import './Cards.css';

const Cards = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Box className='home-page'>
            <NavBar />
            <div className='products'>
                {currentProducts.map((product, index) => (
                    <div key={index}>
                        <SingleProduct product={product} />
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <Button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Prev</Button>
                <Button disabled={indexOfLastProduct >= products.length} onClick={() => paginate(currentPage + 1)}>Next</Button>
                {currentPage !== 1 && (
                    <Button onClick={() => paginate(1)}>Back to Home Page</Button>
                )}
            </div>
        </Box>
    );
};

export default Cards;
