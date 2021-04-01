import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <FormControl type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search products...' className='mr-sm-2 ml-sm-5' >
                </FormControl> 
                <Button type='submit' variant='outline-success' className='p-2'>Search</Button> 
            </Form>
        </div>
    )
}

export default SearchBox
