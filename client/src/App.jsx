import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFount from "./pages/PageNotFount";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import DashBoard from "./components/User/DashBoard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import AdminRoute from "./components/Routes/AdminRoute";
import Create_Category from "./pages/Admin/Create_Category";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./components/User/Profile";
import Orders from "./components/User/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./components/User/Search";
import ProductDeatils from "./pages/ProductDeatils";
import Categories from "./components/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="product/:slug" element={<ProductDeatils />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<DashBoard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashBoard />} />
            <Route path="admin/create-caterogy" element={<Create_Category />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
