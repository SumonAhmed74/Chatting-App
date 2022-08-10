import React, {useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
 import Leftbar from '../components/Leftbar';
import GruphList from '../components/GruphList';
import SeachBox from '../components/SeachBox';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import UserList from '../components/UserList';
 
const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [emailVeryfication,setEmailVeryfication] = useState(false)
 
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVeryfication(user.emailVerified)  
      } else {
        navigate('/login')
      }
    });
  },[])

 
 
  return (
  <>
    { 
      emailVeryfication
      ?
      <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="home" />
      </Grid>
      <Grid item xs={4}>
        <SeachBox />
        <GruphList />
        <FriendRequest />
      </Grid>
      <Grid item xs={3}>
        <Friends />
      </Grid>
      <Grid item xs={3}>
        <UserList />
      </Grid>
    </Grid>
      
      :
      <Grid container spacing={2}>
  <Grid item xs={4}>
  </Grid>
  <Grid item xs={4}>
     <Alert severity="info">
        Please check your Email for — <strong>Verification!</strong>
      </Alert> 
  </Grid>
  <Grid item xs={4}>
  </Grid>
</Grid>

      
    }
    
  </>
  )
}

export default Home