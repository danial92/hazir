import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'

const ProductsCarousel = () => {
    const dispatch = useDispatch()
    const topProducts = useSelector(state => state.topProducts)
    const { loading, error, products } = topProducts

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
    :
    <Carousel pause='hover' className='bg-primary'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel_caption'>
                        {product.name} (${product.price})
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
}

export default ProductsCarousel
