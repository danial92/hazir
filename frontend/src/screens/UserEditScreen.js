import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserProfile, updateUserAction } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  const dispatch = useDispatch()

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, user } = userProfile

  const updateUser = useSelector((state) => state.updateUser)
  const { loading: loadingUdpate, error: errorUpdate, success: successUpdate } = updateUser


  useEffect(() => {
    if(successUpdate) { // if successfully updated
        dispatch({ type: USER_UPDATE_RESET })
        history.push('/admin/userlist')
    } else {
        if(!user.name || user._id !== userId) {
            dispatch(getUserProfile(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
  }, [dispatch, user, userId, history, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin }))
  }

  return (
    <FormContainer>
      <h1>EDIT USER</h1>
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

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
    }
    </FormContainer>
  )
}

export default UserEditScreen
