import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
import {BsThreeDotsVertical} from 'react-icons/bs'
import {Alert} from '@mui/material'
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [friendRequest,setFriendRequest] = useState([])

   
    useEffect(()=>{
        const friendRequestArr=[]
        const friendRequestRef = ref(db,'friendRequest');
        onValue(friendRequestRef, (snapshot) => {
        const data = snapshot.val();
            snapshot.forEach(item=>{
                if(item.val().receverid==auth.currentUser.uid){
                    friendRequestArr.push({
                        name:item.val().name,
                        receverid:item.val().receverid,
                        senderid:item.val().senderid
                    })
                }
                setFriendRequest(friendRequestArr)
              })
          });
    },[])

  return (
    <div className='gruph-List friendList'>
        <h2>Friend  Request</h2>
            <BsThreeDotsVertical className='menuIcon'/>
      
        {friendRequest.map(item=>(
             <div className='box'>
             <div className='image'>
              <img src='./assets/images/friends1.png'/>
             </div>
              <div className='name'>
                  <h3>{item.name}</h3>
                  <p>Hi Guys, Wassup!</p>
              </div>
              <div className='btn'>
                  <button>Accept</button>
              </div>
             </div>
        ))}
        {friendRequest.length == 0 && <Alert severity="error">No friend request</Alert>}
    </div>
  )
}

export default FriendRequest