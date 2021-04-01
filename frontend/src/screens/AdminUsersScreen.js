import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getAllUsersAction, deleteUserAction } from '../actions/userActions'

const AdminUsersScreen = ({ history }) => {

    const dispatch = useDispatch()
    const getAllUsers = useSelector(state => state.getAllUsers)
    const { loading, error, users } = getAllUsers

    const deleteUser = useSelector(state => state.deleteUser)
    const { success } = deleteUser

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getAllUsersAction())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, success])

    const deleteUserHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUserAction(id))
        }
    }

    return (
        <>
                <h3>Users</h3>
                <Table striped bordered hover responsive class='table-sm' >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                      {user.isAdmin ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button><i class='fas fa-edit'></i></Button>
                                        </LinkContainer>
                                        <Button onClick={()=> deleteUserHandler(user._id)}><i class='fas fa-trash'></i></Button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    )
}

export default AdminUsersScreen
