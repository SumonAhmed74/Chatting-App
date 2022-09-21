import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { getAuth } from "firebase/auth";
import {RiMessage2Line} from 'react-icons/ri'

import { useDispatch } from 'react-redux'
import { activeName } from '../reducers/activeChatSlice';

const GruphPageFriends = (props) => {
    const auth = getAuth();
    const db = getDatabase();
    const [ friends,setFriends ] = useState([])

    const dispatch = useDispatch();
 

    useEffect(()=>{
        const friendsArray = []
        const friendsRef = ref(db, 'friends/');
        onValue(friendsRef, (snapshot) => {
          snapshot.forEach((item)=>{
            if(auth.currentUser.uid==item.val().receverid || auth.currentUser.uid==item.val().senderid){
                friendsArray.push({
                  date: item.val().date,
                  id: item.val().id,
                  receverid: item.val().receverid,
                  recevername: item.val().recevername,
                  senderid: item.val().senderid,
                  sendername: item.val().sendername,
                })
            }
          })
          setFriends(friendsArray)
        });

    },[])    

    const ChatMessageHandler = (item)=>{
      const userInfo ={}
      if(item.receverid == auth.currentUser.uid){
        userInfo.id = item.senderid
        userInfo.name = item.sendername
      }
      else{
        userInfo.id = item.receverid
        userInfo.name = item.recevername
      }
      dispatch(activeName(userInfo))
    }

  return (
    <div className='gruph-List friends gruphPageFriends'>
    <div className='topBox'>
    <h2>{friends.length} {friends.length>1 ? "Friends" : "Friend"}</h2>
         <BsThreeDotsVertical className='menuIcon'/>
    </div>
         {friends.length == 0 && <Alert severity="error">You Have No Friends !</Alert>}
         {friends.map((item)=>(

             <div className='box' onClick={()=>ChatMessageHandler(item)}>
             <div className='image'>
             <img src='./assets/images/friends1.png'/>
             </div>
                 <div className='name'>
                     {auth.currentUser.uid == item.senderid
                     ?
                     <h3>{item.recevername}</h3>
                     :
                     <h3>{item.sendername}</h3>
                     }                   
                     <p>Dinner?</p>
                 </div>
                 <div className='buttonBox'>
                   {props.date == "date"
                   ?
                  <>
                   <div className='btn'>
                     <p>{item.date}</p>
                   </div>
                  </>
                   :
                   <div className='btn'>
                     <button>
                       <RiMessage2Line />
                       </button>
                     </div>
                   }
                 
                 </div>
              </div>
         ))}
 </div>
  )
}

export default GruphPageFriends
