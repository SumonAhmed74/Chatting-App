import React, { useState } from 'react'
import {TextField,Button} from '@mui/material'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email,setEmail]=useState()


  const resetPasswordHandler =()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    navigate('/login',{state:{data:"Check your email for reset password !"}})
  })
  .catch((error) => {
    console.log(error)
  });
  }

  return (
    <div className='resetPassword'>
      <div className='resetBox'>
        <h1>Reset Password From</h1>
        <div className='box'>
            <h2>Forgot Password</h2>
            <p>For reset your password, enter your email address below</p>
            <TextField
              className='inputBox'
              id="demo-helper-text-misaligned"
              label="Your email address"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Button onClick={resetPasswordHandler} variant="contained" disableElevation>
              Reset Password
            </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

