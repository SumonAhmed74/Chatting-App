import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { getDatabase, ref, onValue} from "firebase/database";

const Friends = () => {
    const db = getDatabase();
    const [ friends,setFriends ] = useState([])
 

    useEffect(()=>{
        const friendsArray =[];
        const friendsRef = ref(db, 'friends/');
            onValue(friendsRef, (snapshot) => {
                snapshot.forEach((friend)=>{
                    friendsArray.push({
                        sendername:friend.val().sendername,
                        senderid:friend.val().senderid,
                        recevername:friend.val().recevername,
                        receverid:friend.val().receverid
                    })
                })
                setFriends(friendsArray)
            });

    },[])
    

  return (
    <div className='gruph-List friends'>
        <h2>Friends</h2>
            <BsThreeDotsVertical className='menuIcon'/>
            {friends.map((item)=>(
                <div className='box'>
                <div className='image'>
                <img src='./assets/images/friends1.png'/>
                </div>
                    <div className='name'>
                        <h3>{item.sendername}</h3>
                        <p>Dinner?</p>
                    </div>
                    <div className='btn'>
                        <p>Today</p>
                    </div>
                 </div>
            ))}
            

    </div>
  )
}

export default Friends