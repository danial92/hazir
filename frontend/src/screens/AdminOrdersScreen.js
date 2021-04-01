import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getAllOrdersAction } from '../actions/orderActions'
import { Link } from 'react-router-dom';

const AdminOrdersScreen = ({ history }) => {

    const dispatch = useDispatch()
    const getAllOrders = useSelector(state => state.getAllOrders)
    const { loading, error, orders } = getAllOrders


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getAllOrdersAction())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
                <h3>Orders</h3>
                <Table striped bordered hover responsive class='table-sm' >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Payment Date</th>
                            <th>Delivered</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>
                                      {order.createdAt && order.createdAt.substring(0,10)}
                                    </td>
                                    <td>
                                        ${order.totalPrice}
                                    </td>
                                    <td>
                                      {order.paidAt && order.paidAt.substring(0,10)}
                                    </td>
                                    <td>
                                      {order.isDelivered ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}
                                    </td>
                                    <td>
                                    <th>
                                        <Link to={`/order/${order._id}`}>
                                            <Button>Details</Button>
                                        </Link>
                                    </th>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    )
}

export default AdminOrdersScreen
