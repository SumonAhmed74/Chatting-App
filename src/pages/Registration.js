import React, { useState } from 'react'
import {Grid,TextField,Button,Collapse,Alert,IconButton,} from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")

const [nameErr,setNameErr] = useState("")
const [emailErr,setEmailErr] = useState("")
const [passwordErr,setPasswordErr] = useState("")
const [confirmPasswordErr,setConfirmPasswordErr] = useState("")
const [passwordLengthErr,setPasswordLengthErr] = useState("")
const [passwordMatchErr,setPasswordMatchErr] = useState("")

const [exitEmailErr,setExitEmailErr] = useState(false)


const signUpHandler = ()=>{
  if(!name){
    setNameErr("Please enter a name")
  }else if(!email){
    setEmailErr("Please enter an email")
    setNameErr("")
  }else if(!password){
    setPasswordErr("Please enter a password")
    setEmailErr("")
  }else if(password.length<8){
    setPasswordLengthErr("Password must be grater than or Equal to 8")
    setPasswordErr("")
  } else if(!confirmPassword){
    setConfirmPasswordErr("Please enter your confirm-password")
    setPasswordLengthErr("")
  }else if(password!==confirmPassword){
    setPasswordMatchErr("Password Not Match")
    setConfirmPasswordErr("")
  }else{ 
    setPasswordMatchErr("")
    createUserWithEmailAndPassword(auth,email,password).then((user)=>{
      sendEmailVerification(auth.currentUser)
      .then(() => {
        updateProfile(auth.currentUser, {
          
          displayName: name,
        }).then(() => {
            set(ref(db, 'users/'+auth.currentUser.uid), {
              username: name,
              email: email
            });
          console.log("name set")
        }).catch((error) => {
          console.log(error)
        });
      });
    
      navigate('/login')
  
    }).catch((error)=>{
      console.log(error)
      const errorCode = error.code;
      if(errorCode.includes('email')){
        setExitEmailErr("Email Already in use Please Try Again!")
        setOpen(true)
      }
    })
  }
}


  return (
  <section className='registration-part'>
        <Grid container spacing={0}>
  <Grid item xs={6}>
   <div className='box'>
   <div className='left'>
      <h2>Get started with easily register</h2>
      <p>Free register and you can enjoy it</p>

      <Collapse in={open}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {exitEmailErr}
        </Alert>
      </Collapse>

      <TextField
        className='inputBox'
        helperText={nameErr}
        id="demo-helper-text-misaligned"
        label="Full name"
        type='text'
        onChange={(e)=> setName(e.target.value)}
      /> <br/>

      <TextField
        className='inputBox'
        helperText={emailErr}
        id="demo-helper-text-misaligned"
        label="Enter email"
        type='email'
        onChange={(e)=> setEmail(e.target.value)}
      /> <br/>

      <TextField
        className='inputBox'
        helperText={passwordErr?passwordErr:passwordLengthErr?passwordLengthErr:""}
        id="demo-helper-text-misaligned"
        label="Password"
        type='password'
        onChange={(e)=> setPassword(e.target.value)}
      /> <br/>

      <TextField
        className='inputBox'
        helperText={confirmPasswordErr?confirmPasswordErr:passwordMatchErr?passwordMatchErr:""}
        id="demo-helper-text-misaligned"
        label="Confirm password"
        type='password'
        onChange={(e)=> setConfirmPassword(e.target.value)}
      /> <br/>

      <Button onClick={signUpHandler} className='signUpBtn' variant="contained">Sign up</Button>
      <p className='msg'>Already have an account ?<Link to="/login">Login</Link></p>
      
    </div>
   </div>
  </Grid>
  <Grid item xs={6}>
  <div className='right'>
  <img src='./assets/images/registration-pic.png'/>
  {/* <div className='img'></div> */}
  </div>
  </Grid>
</Grid>
  </section>

  )
}

export default Registration