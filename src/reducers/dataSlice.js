import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {db, timestamp} from '../config/firebase'



const initialState = {
  data: {
      dataFromDB:null,
      update:0
  },

}

export const updateDB = createAsyncThunk(
    'firestore/update',
    async(info,thunkAPI) =>{
        let {docID,
            patientName,
            date1,
            date2,
            symptomsPresent,
            riskExposure,
            immunocompromisedStatus} = info;
        const response = await db.collection("reports").doc(`${docID}`).update(
           {
            patient:patientName,
            symptomsAtTimeOfTesting:symptomsPresent,
            immunocompromised:immunocompromisedStatus,
            exposure14DaysBeforeTestDate:riskExposure,
            labCollectionDate:date1,
            symptomOnsetDate: date2,
           }
        ).then(()=>{
            console.log('updated')
        })
        return response;
        

    }
)

export const fetchData = createAsyncThunk(
    'firestore/fetch',
    async(info)=>{
        let {currentUser} = info;
        const response = await db.collection("reports")
        .where("user", "==" , `${currentUser}`)
        .orderBy("createdAt", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
            let data = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                let docData = doc.data();
                let docID = doc.id
                data.push({docID , docData});
            });
            // console.log(data)
            return JSON.parse(JSON.stringify(data));
        })
        return response;


    }
)

export const writeToDB = createAsyncThunk(
    'fireStore/writeToDB',
    async(info)=>{
        let {patientName, 
            selectedDate,
            selectedDate2,
            checked,
            checked2,
            checked3,
            userEmail
        } = info;
        const res = await db.collection("reports").add({
            patient: patientName,
            labCollectionDate: selectedDate,
            symptomOnsetDate:selectedDate2,
            symptomsAtTimeOfTesting:checked,
            exposure14DaysBeforeTestDate:checked2,
            immunocompromised:checked3,
            user: userEmail,
            createdAt:timestamp
            
        })
        .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
            // return JSON.parse(JSON.stringify(info));;
        })
        return res;

        
    }
)




const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
      clearData(state,action){
          state.data.dataFromDB = null;
      },
  },
  extraReducers: {
      [writeToDB.rejected]:(state, action) => {

      },
      [writeToDB.fulfilled]:(state, action) => {
        // state.data.dataFromDB.push(action.payload)  
      },
      [fetchData.rejected]:(state,action) => {
          console.log(action)

      },
      [fetchData.fulfilled]: (state,action) => {
        // console.log(action.payload)
        state.data.dataFromDB = action.payload;
      },
      [updateDB.rejected]:(state, action)=>{
          console.log(action)

      },
      [updateDB.fulfilled]:(state, action)=>{
            state.data.update++;
      }


  }

})

export const {  clearData } = dataSlice.actions

export default dataSlice.reducer

// export const selectAllPosts = (state) => state.posts.posts

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)