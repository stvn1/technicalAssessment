import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { differenceInDays} from "date-fns";

//
/*eslint-disable eqeqeq*/
/* eslint-disable no-useless-escape */
import styled from 'styled-components'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {writeToDB} from '../reducers/dataSlice'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Technical Assessment '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const PatientForm = styled.input`
width:100%;
height:40px;
text-align:center;
border:none;
background-color:inherit;
border-bottom: 1px solid black;
`

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    textAlign: 'center',
  },
}));

const Form = () => {


  const dispatch = useDispatch();
  const userEmail = useSelector((state)=> state.user.user.userDetails.email)
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [patientName,setPatientName] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date2) => {
    setSelectedDate2(date2);
  };
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };
  const handleCheckbox2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleCheckbox3 = (event) => {
    setChecked3(event.target.checked);
  };

  const handleClear = () => {
    setPatientName("");
    setSelectedDate(null);
    setSelectedDate2(null);
    setChecked(false);
    setChecked2(false);
    setChecked3(false);
  
  };
  function handleSubmit(event) {
    event.preventDefault();
  
    // console.log( selectedDate, selectedDate2); 
    if(patientName==""){
        alert('Patient Box should not be empty');
        return;
    }
    if(selectedDate == null && selectedDate2 == null){
        alert('Dates should be picked');
        return;
    }
    if(selectedDate == 'Invalid Date' && selectedDate2=='Invalid Date'){
      alert("Please enter valid dates");
      return;
    }

    
      var dubdays = differenceInDays(selectedDate, selectedDate2);
      console.log(dubdays);
      if (isNaN(dubdays) && checked2==false && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate, 10), "dd MMM yyyy") + "\nPOC from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      } else if (isNaN(dubdays) && checked2==false && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate, 20), "dd MMM yyyy") + "\nPOC from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      } else if (isNaN(dubdays) && checked2==true && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate, 10), "dd MMM yyyy") + "\nPOC from 48 hours after high risk exposure");
      } else if (isNaN(dubdays) && checked2==true && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate, 20), "dd MMM yyyy") + "\nPOC from 48 hours after high risk exposure");
      } else if (dubdays >= 0 && checked==true && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 10), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate2, -2), "dd MMM yyyy"));
      } else if (dubdays >= 0 && checked==true && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 20), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate2, -2), "dd MMM yyyy"));
      } else if (dubdays >= 0 && checked==false && checked2==false && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 10), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      } else if (dubdays >= 0 && checked==false && checked2==false && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 20), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      } else if (dubdays >= 0 && checked==false && checked2==true && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 10), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate2, -2), "dd MMM yyyy"));
      } else if (dubdays >= 0 && checked==false && checked2==true && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate2, 20), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate2, -2), "dd MMM yyyy"));
      } else if (dubdays < 0 && checked3==false) {
        // alert("ISO: End of " + format(addDays(selectedDate, 10), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      } else if (dubdays < 0 && checked3==true) {
        // alert("ISO: End of " + format(addDays(selectedDate, 20), "dd MMM yyyy") + "\nPOC: from " + format(addDays(selectedDate, -2), "dd MMM yyyy"));
      };

    dispatch(writeToDB({
      patientName, 
      selectedDate,
      selectedDate2,
      checked,
      checked2,
      checked3,
      userEmail
    }))

    handleClear();


}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.heading}>
          Ontario COVID-19 Isolation End Date and POC Calculator
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Lab Collection Date"
          format="dd MMM yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          onInput={ e=>setSelectedDate(e.target.value)}
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
          id="date-picker-dialog2"
          label="Symptom Onset Date"
          format="dd MMM yyyy"
          value={selectedDate2}
          onChange={handleDateChange2}
          onInput={ e=>setSelectedDate2(e.target.value)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          rifmFormatter={val=> val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')}
          refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi} 
        />
      </Grid>
      <Grid className="checkboxlabel">
          <Checkbox
            checked={checked}
            onChange={handleCheckbox}
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>Symptoms present at the time of testing</span>
        </Grid>
              <Grid className="checkboxlabel">
          <Checkbox
            checked={checked2}
            onChange={handleCheckbox2}
            name="checked2"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>High risk exposure 14 days before test date</span>
        </Grid>
        <Grid className="checkboxlabel">
          <Checkbox
            checked={checked3}
            onChange={handleCheckbox3}
            name="checked3"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>Immunocompromised</span>
        </Grid>
          <PatientForm
            onChange={ (e) =>setPatientName(e.target.value)}
            value={patientName}
            type="text"
            placeholder="Patient Name:"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
    </MuiPickersUtilsProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SUBMIT
          </Button>
        </form>
        <Button
            type="clear"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => { handleClear(); }}
          >
            CLEAR
          </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Form;