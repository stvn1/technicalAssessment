import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { auth } from '../config/firebase';
import firebase from "firebase/app";


const initialState = {
  user: {
      isLoggedIn:false,
      message:null,
      userDetails:{}
  },

}
export const login = createAsyncThunk(
  "firebase/login",
  async (credentials) => {
    let {email, password} = credentials;
    //we use set persistance to keep user logged in until user logs out
    //easy to reverse behaviour if needed
    const response = await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then( async () => {
        const res = await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // console.log("fulfilled")
          var user = userCredential.user.email;
          return user ;
        })
        return res;
      })
      return response;
  }
)

export const logout = createAsyncThunk(
  'firebase/logout',
  async()=>{
    const response = await firebase.auth().signOut()
    .then(() =>{
    });
    return response;
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user.isLoggedIn = true;
      state.user.userDetails = action.payload;
    },


  },
  extraReducers: {
    [login.rejected]: (state, action) => {
      const message = action.error.message;
      state.user.message = message;
    },
    [login.fulfilled]: (state, action) => {
      let user = action.payload;
      state.user.userDetails = {user};
      state.user.message = null;
      state.user.isLoggedIn = true;
      
    },
    [logout.rejected]: (state, action) =>{

    },
    [logout.fulfilled] : (state, action)=>{
      state.user.userDetails = {};
      state.user.message = null;
      state.user.isLoggedIn = false;

    }
  }

})

export const {  setUser } = userSlice.actions

export default userSlice.reducer

// export const selectAllPosts = (state) => state.posts.posts

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)