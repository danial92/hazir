import React, { useEffect } from 'react'
import { Alert, Button, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listAllProducts, deleteProductAction, createProductAction } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'


const AdminProductsScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const listProducts = useSelector(state => state.listProducts)
    const { loading, error, products, pages, page } = listProducts 

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteProduct

    const createProduct = useSelector(state => state.createProduct)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = createProduct

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listAllProducts('', pageNumber)) 
        }

    }, [dispatch, history, userInfo, successDelete, createdProduct, successCreate, pageNumber])

    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProductAction(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProductAction())
    }

    return (
        <>
                <h3>Products</h3>
                { loadingDelete && <Loader /> }
                { errorDelete && <Message variant='danger'>{errorDelete}</Message> }
                { loadingCreate && <Loader /> }
                { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
                <Col className='text-right'>
                        <Button onClick={createProductHandler} className='my-3'>Create Product</Button>
                </Col>
                {loading ? <Loader /> : error ? <Alert variant='danger'>{error}</Alert> : 
                (<Table striped bordered hover responsive class='table-sm' >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button><i class='fas fa-edit'></i></Button>
                                        </LinkContainer>
                                        <Button onClick={()=> deleteProductHandler(product._id)}><i class='fas fa-trash'></i></Button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </Table>)}
                <Paginate pages={pages} page={page} isAdmin={true} />
        </>
    )
}

export default AdminProductsScreen
