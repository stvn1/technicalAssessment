import React from 'react'
import {useState, useEffect} from 'react';

import { useHistory } from 'react-router-dom'

//styled 
import styled from 'styled-components'

//redux stuff
import { login } from '../reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from '../reducers/userSlice'

//firebase
import firebase from 'firebase/app'

//bootstrap stuff
import { Form, Button, } from "react-bootstrap"

/*eslint-disable eqeqeq*/

const Container = styled.div`
width: 400px;
margin:auto;
margin-top:15%;
padding:20px;
border:4px solid black;
border-radius:50px;

`

function SignIn() {


  const dispatch = useDispatch()
  const history = useHistory();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const error = useSelector((state)=> state.user.user.message);
    const isLoggedIn = useSelector((state)=> state.user.user.isLoggedIn);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handlesubmit")
        dispatch(login({email,password}))
    }
    useEffect(() => {
      console.log(isLoggedIn);
      if(isLoggedIn == true){
        history.push('/dashboard')
      }
      firebase.auth().onAuthStateChanged(function(user) {
        // console.log(user)
        if (user) {
          let email = user.email;
          dispatch(setUser({email}))
        } else {
        }
      });
    }, [isLoggedIn, dispatch, history])

    return (
        <Container>

            <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}}  required />
            </Form.Group>
            { error != null ?  
                <div className='text-danger'>
                    Wrong credentials!
                </div> 
                : null}
                <br></br>
            <Button  className="w-100" type="submit">
              Log In
            </Button>
          </Form>            
        </Container>
    )
}

export default SignIn
