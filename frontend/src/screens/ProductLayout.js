import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

const ProductLayout = ({ product }) => {
    return (
        <div>
            <Card className='my-3 py-2 px-2' style={{ width: '18rem' }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                    <Card.Text>${product.price}</Card.Text>
                    <Card.Text>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text>Status {product.countInStock < 1 ? <p>Out of Stock</p> : <p>In Stock</p>}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProductLayout
