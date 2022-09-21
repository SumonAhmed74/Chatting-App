import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaUserFriends} from 'react-icons/fa'
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { getAuth } from "firebase/auth";
import {BsCheck} from "react-icons/bs"


const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userList,setUserList] = useState([])
  const [friendRequest,setFriendRequest] = useState([])
  const [friend,setFriend] = useState([])
  const [change,setChange] = useState(false)


  const userArr = []
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item)=>{
        userArr.push({
            username: item.val().username,
            email:item.val().email,
            id: item.key
        })   
      })
      setUserList(userArr)
    });
  },[])

 
  useEffect(()=>{
    const friendRequestArr=[]
    const friendRequestRef = ref(db,'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
    const data = snapshot.val();
        snapshot.forEach(item=>{
                friendRequestArr.push(item.val().receverid+item.val().senderid)

          })
          setFriendRequest(friendRequestArr)
      });
},[change])

  useEffect(()=>{
    const friendArr=[]
    const friendRef = ref(db,'friends/');
    onValue(friendRef, (snapshot) => {
    const data = snapshot.val();
        snapshot.forEach(item=>{
          friendArr.push(item.val().receverid+item.val().senderid)

          })
          setFriend(friendArr)
      });
},[])


const friendRequestHandler = (info) =>{
  set(push(ref(db, 'friendRequest')), {
    sendername:auth.currentUser.displayName,
    senderid:auth.currentUser.uid,
    receverid:info.id,
    recevername:info.username,
  });
  setChange(!change)
}


  return (
    <div className='gruph-List userList'>
        <div className='topBox'>
        <h2>User List</h2>
        <BsThreeDotsVertical className='menuIcon'/>
        </div>
            <>
            {userList.map(users=>(
                auth.currentUser.uid !== users.id &&
                 <div className='box'>
                 <div className='image'>
                  <img src='./assets/images/friends1.png'/>
                 </div>
                  <div className='name'>
                      <h3>{users.username}</h3>
                      <p>Today, 8:56pm</p>
                  </div>
                  <div className='userBtn'>
                    {friend.includes(users.id + auth.currentUser.uid) || friend.includes(auth.currentUser.uid + users.id)?
                     <button><FaUserFriends /></button>
                    :
                    friendRequest.includes(users.id + auth.currentUser.uid) || friendRequest.includes(auth.currentUser.uid + users.id) ?
                      <button><BsCheck /></button>
                      :
                      <button onClick={()=>{friendRequestHandler(users)}}>+</button>
                     
                    }

                  
                     
                  </div>
                 </div>
            ))}
            </>
    
    </div>
  )
}

export default UserList
