import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import {BsThreeDotsVertical} from 'react-icons/bs'
import {Alert} from '@mui/material'
import { getAuth } from "firebase/auth";
 
const FriendRequest = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [friendRequest,setFriendRequest] = useState([])
    const [frndDlt,setFrndDlt] = useState(false)
   
   
    useEffect(()=>{
        const friendRequestArr=[]
        const friendRequestRef = ref(db,'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
        const data = snapshot.val();
            snapshot.forEach(item=>{
                if(item.val().receverid==auth.currentUser.uid){
                    friendRequestArr.push({
                        id:item.key,
                        recevername:item.val().recevername,
                        receverid:item.val().receverid,
                        senderid:item.val().senderid,
                        sendername:item.val().sendername,
                    })
                }
                setFriendRequest(friendRequestArr)
              })
          });
    },[frndDlt])

    const acceptFrndHandler = (frnds)=>{
        const useRef = ref(db, 'friends');
        const newRef = push(useRef)
        set(newRef, {
            id:frnds.id,
            recevername:frnds.recevername,
            receverid:frnds.receverid,
            senderid:frnds.senderid,
            sendername:frnds.sendername,
          }).then(()=>{
            remove(ref(db, 'friendRequest/'+frnds.id)).then(()=>{
                setFrndDlt(!frndDlt)
            })
               
          }) 

    }


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
                    <h3>{item.sendername}</h3>
                    
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div className='btn'>
                    <button onClick={()=> acceptFrndHandler(item)}>Accept</button>
                </div>
            </div>
        ))}
        
        {friendRequest.length == 0 && <Alert severity="error">No friend request !</Alert>}
    </div>
  )
}

export default FriendRequest;