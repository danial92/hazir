import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { singleProductDetails, updateProductAction } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const updateProduct = useSelector((state) => state.updateProduct)
  const { loading: loadingUdpate, error: errorUpdate, success: successUpdate } = updateProduct


  useEffect(() => {
    if(successUpdate) { // if successfully updated
        dispatch({ type: PRODUCT_UPDATE_RESET })
        history.push('/admin/productlist')
    } else {
        if(!product.name || product._id !== productId) {
            dispatch(singleProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
        }
    }
  }, [dispatch, product, productId, history, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProductAction({ _id: productId, name, price, description, image, brand, category, countInStock }))
  }

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/uploads', formData, config)

        setImage(data)
        setUploading(false)
    } catch (err) {
        console.log(err)
        setUploading(false)
    }
  }

  return (
    <FormContainer>
      <h1>EDIT PRODUCT</h1>
      { loadingUdpate && <Loader /> }
      { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
      <Form onSubmit={submitHandler}>


      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='price'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
        </Form.Group>


        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.file)}
              ></Form.Control>
        </Form.Group>
        <Form.File
            id='image_file'
            label='Choose Image'
            custom
            onChange={uploadImageHandler}
        >
            {uploading && <Loader />}
        </Form.File>


        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
              <Form.Control
                type='brand'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
        </Form.Group>


        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
        </Form.Group>


        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='countInStock'
                placeholder='Enter Count in Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
    }
    </FormContainer>
  )
}

export default ProductEditScreen
