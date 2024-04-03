import React from 'react'
import Menu from '@mui/material/Menu';
import { Stack, Button, IconButton, AppBar, Toolbar, Typography, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import DropdownMenuIcon from '../Home/Menulist'
import ProductsFilter from '../Products/ProductsFilter';
import './NavBar.css'

const NavBar = ({ products }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');

    const handleClick = () => {
        localStorage.clear();
        window.location.reload();
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const addShippingAddress = () => {
        navigate('/add-address');
    }

    return (
        <div margin>
            <AppBar position="fixed" sx={{ padding: 0, left: 0, right: 0 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <DropdownMenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        onClick={goToHome}
                        className='app-name'
                    >
                        <img src="https://static.vecteezy.com/system/resources/previews/016/471/452/non_2x/abstract-modern-ecommerce-logo-ecommerce-logo-design-shop-logo-design-template-creative-ecommerce-logo-vector.jpg"
                            alt="navbar"
                            style={{ maxHeight: '50px', width: 'auto', borderRadius: '50%', display: 'flex', alignItems: 'center' }}
                        />
                    </Typography>
                    <div className='buttons'>
                        <Stack spacing={2} direction="row">
                            <ProductsFilter products={products} />
                            {isAuthenticated ? (
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <AccountCircleIcon fontSize='large' {...bindTrigger(popupState)} className='logged-in' />
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => { addShippingAddress(); popupState.close(); }}>Profile</MenuItem>
                                                <MenuItem onClick={() => { handleClick(); popupState.close(); }}>Logout</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            ) : (
                                <Stack spacing={2} direction="row">
                                    <Link to="/login">
                                        <Button variant="contained">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="contained">Sign Up</Button>
                                    </Link>
                                </Stack>
                            )}
                            <ShoppingCartIcon fontSize='large' />
                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
