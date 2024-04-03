import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home'
import SignIn from "../Components/Auth/UserLogin";
import Register from "../Components/Auth/UserRegister";
import BasicList from "../Orders";
import AddAddres from "../Components/addAdress/AddAddres";
import ProductPage from "../Components/Products/ProductPage";
import OrderPage from "../Components/Orders/OrderPage";

export default function StackRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/add-address" element={<AddAddres />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/my-orders" element={<BasicList />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="orders/:id" element={<OrderPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}