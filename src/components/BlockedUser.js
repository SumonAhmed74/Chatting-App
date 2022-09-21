import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import {Alert} from '@mui/material';

const BlockedUser = () => {
    const auth = getAuth();
    const db = getDatabase();

    const [blockedUser,setBlockedUsers]= useState([])


    useEffect(()=>{
        const blockedFriendsArr = [];
        const starCountRef = ref(db, 'blockUsers/');
            onValue(starCountRef, (snapshot) => {
             snapshot.forEach((info)=>{
                blockedFriendsArr.push({
                    name: info.val().blockedName,
                    date: info.val().date,
                })
             })
             setBlockedUsers(blockedFriendsArr)
            });
    },[])
console.log(blockedUser)

  return (
    <div className='gruph-List myGroup blockedUsers'>
        <h2>Blocked Users</h2>
        {blockedUser.length == 0 && <Alert severity="error">No Blocked Friends !</Alert>}
        {blockedUser.map(item=>(
             <div className='box'>
             <div className='image'>
             <img src='./assets/images/friends1.png'/>
             </div>
                 <div className='name'>
                     <h3>{item.name}</h3>                 
                     <p>Dinner?</p>
                 </div>
                 <div className='btns'>
                     <p>{item.date}</p>
                     <div className='btn'>
                       <button>Unblock</button>
                     </div>
                 </div>
              </div>
        ))}
               
                
     
    </div>
  )
}

export default BlockedUser
