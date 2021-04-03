import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import AdminUsersScreen from './screens/AdminUsersScreen'
import AdminProductsScreen from './screens/AdminProductsScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import AdminOrdersScreen from './screens/AdminOrdersScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
          <main className='py-4 px-5'>
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} /> 
            <Route path='/admin/userlist' component={AdminUsersScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist' component={AdminProductsScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={AdminProductsScreen} exact />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderlist' component={AdminOrdersScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact /> 
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/> 
            <Route path='/' component={HomeScreen} exact />
          </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
