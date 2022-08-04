import React, { useState } from 'react'
import {Grid,TextField,Button,Collapse,Alert,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate } from 'react-router-dom'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [emailErr,setEmailErr] = useState("")
  const [passwordErr,setPasswordErr] = useState("")
  const [passwordLengthErr,setPasswordLengthErr] = useState("")

  const [checkPassword,setcheckPassword] = useState(false)
  const [wrongEmailErr,setwrongEmailErr] = useState('')
  const [wrongPasswordErr,setwrongPasswordErr] = useState('')

const submitHandler =()=>{
  if(!email){
    setEmailErr("Please enter an email")
  }else if(!password){
    setPasswordErr("Please enter a password")
    setEmailErr("")
  }else if(password.length<8){
    setPasswordLengthErr("Password must be greater than or Equal to 8")
    setPasswordErr("")
  }else{
    setPasswordLengthErr("")
    signInWithEmailAndPassword(auth,email,password).then((user)=>{
      console.log(user)
      navigate('/home')

    }).catch((error)=>{
      const errorCode = error.code;
      // console.lo
      if(errorCode.includes('user')){
        setwrongEmailErr("Email NOT Found!")
        setOpen(true)
        setwrongPasswordErr('')
      }else if(errorCode.includes('password')){
        setwrongPasswordErr("Wrong Password!")
        setOpen(true)
        setwrongEmailErr('')
      }
    })
  }
}

const iconHandler = ()=>{
  setcheckPassword(!checkPassword)
 }

 const googleSignIn = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    navigate('/home')
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
 }

  return (
   <section className='login-part'>
        <Grid container spacing={0}>
  <Grid item xs={6}>
    <div className='box'>
    <div className='left'>
    <h1>Login to your account!</h1>
    <div className='login-option'>
    <div className='items'><img src='./assets/images/facebook.png'/> Login with Google</div>
    <div onClick={googleSignIn} className='items'><img src='./assets/images/google.png'/>Login with Facebook</div>
    </div>

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
          {wrongEmailErr?wrongEmailErr:wrongPasswordErr? wrongPasswordErr:""}
        </Alert>
      </Collapse>

    <TextField
    className='inputBox'
      helperText={emailErr}
      id="demo-helper-text-misaligned"
      label="Enter Email"
      type="email"
      onChange={(e)=> setEmail(e.target.value)}
   /> <br/>
 <div className='icon-box'>
 <TextField
    className='inputBox'
      helperText={passwordErr?passwordErr:passwordLengthErr?passwordLengthErr:""}
      id="demo-helper-text-misaligned"
      label="Password"
      type={checkPassword?"text":"password"}
      onChange={(e)=> setPassword(e.target.value)}
   /> 
  {checkPassword?
  <AiFillEye onClick={iconHandler} className='icon'/>
  :
  <AiFillEyeInvisible onClick={iconHandler} className='icon'/>
}
 </div>
    <br/>

<Button onClick={submitHandler} className='loginBtn' variant="contained" disableElevation>
 Login to Continue
</Button>
<p className='msg'>Don't have an account ?<Link to="/">Sign up</Link></p>
     </div>
    </div>
    

  </Grid>
  <Grid item xs={6}>
    <div className='right'>
     <img src='./assets/images/login-pic.png'/>
    </div>
  </Grid>
</Grid>
   </section>

  )
}

export default Login