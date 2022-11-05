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


const Notification = () => {
    const auth = getAuth();
    const db = getDatabase();
    const dispatch = useDispatch();
    const [groupNotifyList,setGroupNotifyList]=useState([])

    useEffect(()=>{
      const groupNotifyRef = ref(db, 'groupNotifications/');
        onValue(groupNotifyRef, (snapshot) => {
          const groupNotifyListArr = [];
          snapshot.forEach((item)=>{
           
            groupNotifyListArr.push(item.val())
          })
          setGroupNotifyList(groupNotifyListArr)
          dispatch(notification(0))
        });
    },[db])


  return (
    <div>
       <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="notification" />
      </Grid>
      <Grid item xs={9.80}>
      <SeachBox />
      <NotificationList list={groupNotifyList}/>
      </Grid>
      
    </Grid>
    </div>
  )
}

export default Notification
