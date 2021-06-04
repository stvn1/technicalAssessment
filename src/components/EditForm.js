import React, {useState} from 'react'


import { useDispatch} from 'react-redux'
import { updateDB} from '../reducers/dataSlice'

//material ui stuff
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';



//extras
import dateFormatter from '../modules-extras/dateFormatter/dateFormatter'


/*eslint-disable eqeqeq*/
/* eslint-disable no-useless-escape */

import styled from 'styled-components'

const MyModal = styled.div`
/* The Modal (background) */
display:${props => (props.modal ? 'block' : 'none')};
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
padding-top: 100px; /* Location of the box */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

/* Modal Content */
.modal-content {
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
-webkit-animation-name: animatetop;
-webkit-animation-duration: 0.4s;
animation-name: animatetop;
animation-duration: 0.4s

}

/* Add Animation */
@-webkit-keyframes animatetop {
from {top:-300px; opacity:0} 
to {top:0; opacity:1}
}

@keyframes animatetop {
from {top:-300px; opacity:0}
to {top:0; opacity:1}
}


/* The Close Button */
.close {
    width:10px;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.edit-form{
    input{
        border:none;
        background-color:inherit;
        border-bottom: 1px solid black;
    }
}
`




const EditForm = (props) => {
    const dispatch = useDispatch();


    const {modalStatus , item, close} = props;

    const[patientName, setPatientName] = useState(item.docData.patient)
    const[date1, setDate1] = useState(dateFormatter(item.docData.labCollectionDate))
    const[date2, setDate2 ] = useState(dateFormatter(item.docData.symptomOnsetDate))
    const[symptomsPresent, setSymptomsPresent] = useState(item.docData.symptomsAtTimeOfTesting)
    const[riskExposure, setRiskExposure] = useState(item.docData.exposure14DaysBeforeTestDate)
    const[immunocompromisedStatus, setImmunocompromisedStatus] = useState(item.docData.immunocompromised)

 

    const handleCloseButton = () =>{
        close();
    }

    const handleUpdateClick = () => {
        if(patientName==""){
            alert('Patient Box should not be empty');
            return;
        }
        if(date1 == null && date2 == null){
            alert('Dates should be picked');
            return;
        }
        if(date1 == 'Invalid Date' && date2=='Invalid Date'){
            alert("Please enter valid dates");
            return;
          }

        let docID = item.docID
        dispatch(updateDB({
            docID,
            patientName,
            date1,
            date2,
            symptomsPresent,
            riskExposure,
            immunocompromisedStatus
        }))
        close();
    }
    const handleDateChange1 = (date) =>{
        setDate1(date);
    }
    const handleDateChange2 = (date) =>{
        setDate2(date);
    }


    return (
        <MyModal modal={modalStatus}>
            <div className='modal-content'>
            <span onClick={handleCloseButton} className="close">&times;</span>
                <div className='edit-form'>
                <br></br>
                Patient name:  
                <input 
                    type='text'
                    value={patientName}
                    onChange={(e)=>{setPatientName(e.target.value)}}
                  />
                <br></br>
                <br></br>
                {/* Lab Collection Date : 
                 <input 
                    type='text'
                    value={date1}
                    onChange={(e)=>{ setDate1(e.target.value)}}
                    /> */}
    
                <br></br>
                <br></br>
                {/* Symptom Onset Date:   */}
                {/* <input 
                    type='text'
                    value={symptomOnSetDate}
                    onChange={(e)=>{setSymptomOnSetDate(e.target.value) }}
                    /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    margin="normal"
                    label="Lab Collection Date"
                    format="dd MMM yyyy"
                    value={date1}
                    onChange={handleDateChange1}
                    onInput={ e=>setDate1(e.target.value)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    rifmFormatter={val=> val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')}
                    refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi} 
                    />
                </Grid>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    margin="normal"
                    label="Lab Collection Date"
                    format="dd MMM yyyy"
                    value={date2}
                    onChange={handleDateChange2}
                    onInput={ e=>setDate2(e.target.value)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    rifmFormatter={val=> val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')}
                    refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi} 
                    />

                </Grid>
                </MuiPickersUtilsProvider>
                <br></br>
                <br></br>
                Symptoms present at the time of testing :  
                <Checkbox 
                    checked={symptomsPresent}
                    onChange={(e)=>{setSymptomsPresent(e.target.checked)}}
                    />
                <br></br>
                High risk exposure 14 days before test date :  
                <Checkbox 
                    checked={riskExposure}
                    onChange={(e)=>{setRiskExposure(e.target.checked)}}
                    />
                <br></br>
                Immunocompromised:  
                <Checkbox 
                    checked={immunocompromisedStatus}
                    onChange={(e)=>{setImmunocompromisedStatus(e.target.checked)}}
                    />
                <br></br>
                <button onClick={handleUpdateClick}>
                    Update
                </button>

              
                
                </div>
            </div>

        </MyModal>
    )
}

export default EditForm
