import React, { useEffect } from 'react'
import HelmetTitles from '../components/HelmetTitles'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductLayout from './ProductLayout'
import Paginate from '../components/Paginate'
import ProductsCarousel from '../components/ProductsCarousel'
import { Link } from 'react-router-dom';


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1 

    const dispatch = useDispatch();

    const listProducts = useSelector(state => state.listProducts)
    const { loading, products, error, page, pages } = listProducts 

    useEffect(() => {
        dispatch(listAllProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <div className='home'>
            <HelmetTitles />
            {!keyword ? <ProductsCarousel /> : <Link to='/' className='btn btn-primary'>Go to Main Page</Link>}
            {
                loading ? <Loader /> : error ? <Message /> :
            <> 
            <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                            <ProductLayout product={product} />
                        </Col>
                    ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
            }
        </div>
    )
}



export default HomeScreen