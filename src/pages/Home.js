import React, {useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Leftbar from '../components/Leftbar';
import SeachBox from '../components/SeachBox';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import UserList from '../components/UserList';
import MyGroup from '../components/MyGroup'
import BlockedUser from '../components/BlockedUser'
import GruphRequest from '../components/GruphRequest';
 
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
        <GruphRequest />
        <FriendRequest />
      </Grid>
      <Grid item xs={3}>
        <Friends date="date" />
        <MyGroup />
      </Grid>
      <Grid item xs={3}>
        <UserList />
        <BlockedUser />
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