import React, {useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Leftbar from '../components/Leftbar';
import SeachBox from '../components/SeachBox';
import NotificationList from '../components/NotificationList';
import { getDatabase, push, ref, set, onValue } from 'firebase/database'
import { useSelector,useDispatch} from 'react-redux'
import { notification } from '../reducers/notificationSlice';
import ProfileSetting from '../components/ProfileSetting';
import AccountSetting from '../components/AccountSetting';

const Setting = () => {
  return (
    <div>
       <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="setting" />
      </Grid>

      <Grid item xs={9.80}>
      <SeachBox />

    <div className='gridBox'>
    <Grid item xs={5.80}>
        <ProfileSetting />
      </Grid>
      <Grid item xs={5.80}>
        <AccountSetting />
      </Grid>
    </div>
      </Grid>

    
     
      
    </Grid>
    </div>
  )
}

export default Setting
