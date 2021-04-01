import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'


const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart;

  if(!shippingAddress.address) {
    history.push('/shipping')
}

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
            <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='Paypal'
                name='paymentMethod'
                value='Paypal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
        </Col>
        </Form.Group>
        <Button type='submit' onClick={submitHandler}>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen;
