import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import {Alert} from '@mui/material';

const BlockedUser = () => {
    const auth = getAuth();
    const db = getDatabase();

    const [blockedUser,setBlockedUsers]= useState([])


    useEffect(()=>{
        const starCountRef = ref(db, 'blockUser/');
            onValue(starCountRef, (snapshot) => {
              const blockedFriendsArr = [];
             snapshot.forEach((info)=>{
              if(info.val().blockById == auth.currentUser.uid){
                  blockedFriendsArr.push({
                    id: info.key,
                    block: info.val().block,
                    blockId: info.val().blockId,
                    date: info.val().date,
                })
              }
              else if(info.val().blockId == auth.currentUser.uid){
                blockedFriendsArr.push({
                  id: info.key,
                  blockByName: info.val().blockByName,
                  blockById: info.val().blockById,
                  date: info.val().date,
              })
              }
              
             })
             setBlockedUsers(blockedFriendsArr)
            });
    },[])

    const unblockHandler = (item)=>{
      set(ref(db, 'friends/'+item.id), {
        recevername: auth.currentUser.displayName,
        receverid: auth.currentUser.uid,
        sendername: item.block,
        senderid: item.blockId,
        date: item.date,
      }).then(()=>{
        remove(ref(db, "blockUser/"+item.id))
      })

    }


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
                     <h3>{item.blockId ? item.block: item.blockByName}</h3>                 
                     <p>Dinner?</p>
                 </div>
                 <div className='btns'>
                     <p>{item.date}</p>
                     {item.blockById
                     ?
                     " "
                     :
                    <div className='btn'>
                       <button onClick={()=>unblockHandler(item)}>Unblock</button>
                     </div>
                    }
                     
                 </div>
              </div>
        ))}
               
                
     
    </div>
  )
}

export default BlockedUser
