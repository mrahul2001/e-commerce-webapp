import React, { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

import OrderDetails from './OrderDetails';

const SingleOrder = ({ order }) => {
    const orderId = order.orderId;
    const [anchor, setAnchor] = useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleWindowClick = (event) => {
        if (anchor && !anchor.contains(event.target)) {
            setAnchor(null);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [anchor]);

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <ListItem disablePadding auto>
            <ListItemButton>
                <ListItemText primary={`Order ID: ${orderId}`} onClick={handleClick} />
                <BasePopup id={id} open={open} anchor={anchor}>
                    <PopupBody>{<OrderDetails order={order} />}</PopupBody>
                </BasePopup>
            </ListItemButton>
        </ListItem>
    );
};

export default SingleOrder;

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
);