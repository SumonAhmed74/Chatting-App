import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import {RiMessage2Line} from 'react-icons/ri'

const Friends = (props) => {
    const auth = getAuth();
    const db = getDatabase();
    const [ friends,setFriends ] = useState([])
 

    useEffect(()=>{
        
        const friendsRef = ref(db, 'friends/');
        onValue(friendsRef, (snapshot) => {
          const friendsArray = []
          snapshot.forEach((item)=>{
            if(auth.currentUser.uid==item.val().receverid || auth.currentUser.uid==item.val().senderid){
                friendsArray.push({
                  date: item.val().date,
                  id: item.val().id,
                  receverid: item.val().receverid,
                  recevername: item.val().recevername,
                  senderid: item.val().senderid,
                  sendername: item.val().sendername,
                  friendId: item.key,
                })
            }
          })
          setFriends(friendsArray)
        });
    },[])    

    const blockUserHandler =(item)=>{
      console.log(item)
      if(auth.currentUser.uid == item.senderid){
        set(push(ref(db, 'blockUser')), {
          block: item.sendername,
          blockId: item.senderid,
          blockByName: item.recevername,
          blockById: item.receverid,
           date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        }).then(()=>{
          remove(ref(db, "friends/"+item.friendId))
        })
      }else{
         set(push(ref(db, 'blockUser')), {
          block: item.sendername,
          blockId: item.senderid,
          blockByName: item.recevername,
          blockById: item.receverid,
          date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        }).then(()=>{
          remove(ref(db, "friends/"+item.friendId))
        })
        
      }
    }
    
   
  return (
    <div className='gruph-List friends'>
       <div className='topBox'>
       <h2>{friends.length} {friends.length>1 ? "Friends" : "Friend"}</h2>
            <BsThreeDotsVertical className='menuIcon'/>
       </div>
            {friends.length == 0 && <Alert severity="error">You Have No Friends !</Alert>}
            {friends.map((item)=>(

                <div className='box'>
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
                    
                     <div className='btn'>
                      <button onClick={()=>blockUserHandler(item)}>block</button>
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

export default Friends