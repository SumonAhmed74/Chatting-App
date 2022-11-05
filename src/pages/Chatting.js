import React, {useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert,Grid } from '@mui/material';
 import Leftbar from '../components/Leftbar';
import SeachBox from '../components/SeachBox';
import Friends from '../components/Friends';
import Message from '../components/Message';
import GruphList from '../components/GruphList'
import GruphPageFriends from '../components/GruphPageFriends';


const Chatting = () => {
  return (
    <div className='ChattingPage'>
       <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="msg" />
      </Grid>
      <Grid item xs={4}>
        <SeachBox />
        <GruphList />
        <GruphPageFriends date="button" />
      </Grid>
      <Grid item xs={6}>
        <Message />
      </Grid>
      
    </Grid>
    </div>
  )
}

export default Chatting
