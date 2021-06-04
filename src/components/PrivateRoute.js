import React, {useState , useEffect} from 'react'

import { Redirect, Route } from 'react-router-dom';

//redux stuff
import {useDispatch} from 'react-redux'
import {setUser} from '../reducers/userSlice'

import firebase from "firebase/app";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [redirect, setRedirect] = useState(false)
  //redux
  // const isLoggedIn = useSelector((state)=> state.user.user.isLoggedIn);
  // console.log(isLoggedIn);

/*eslint-disable eqeqeq*/
  //firebase and hook
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      // console.log(user)
      if (user) {
        let email = user.email;
        setAuthenticated(true)
        setLoaded(true)
        dispatch(setUser({email}))
      } else {
        setRedirect(true)
      }
    });
    return () => {
      setRedirect(false)
    }
  }, [dispatch])




  const show = (props) =>{
    if(redirect==true){
      // console.log('loaded true and authenticated false')
      return (
        <Redirect to={{ pathname: '/',  }} />
      )
    }
    if(loaded == false){
      // console.log('loaded executing')
      return (
        <div>Loading...</div>
      )
    }
    if(loaded == true && authenticated == true)
    // console.log("loaded true and authenticated true")
    return (
      <Component {...props} />
    )
  }
  return (
    <Route
      {...rest}
      render={props =>
       <div>
         {show(props)}
       </div>
      }
    />
  )
}

export default PrivateRoute;