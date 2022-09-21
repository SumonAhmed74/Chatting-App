import React from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth, updateProfile  } from "firebase/auth";
import { useEffect, useState } from "react";

const MyGroup = () => {
    const db = getDatabase();
    const auth = getAuth();


    const [groupList,setGroupList]=useState([])

    useEffect(()=>{
        const groupListErr = [];
        const groupListRef = ref(db, 'groups/');
          onValue(groupListRef, (snapshot) => {
            snapshot.forEach((item)=>{
              groupListErr.push({
                groupName: item.val().groupName,
                groupTagline: item.val().groupTagline,
                adminName: item.val().admin,
                adminId: item.val().adminId,
              })
            })
           setGroupList(groupListErr)
          });
      },[])
      console.log(groupList)

  return (
    <div className='gruph-List myGroup'>
        <h2>My Groups</h2>
                {groupList.map(info=>(
                    auth.currentUser.uid == info.adminId &&
                    <div className='box'>
                    <div className='image'>
                    <img src='../assets/images/groupAvater3.png'/>
                    </div>
                        <div className='name'>
                            <h3>{info.groupName}</h3>                 
                            <p>{info.groupTagline}</p>
                        </div>
                        <div className='btns'>
                            <p>30/8/22</p>
                            <div className='btn'>
                              <button>Info</button>
                            </div>
                        </div>
                     </div>
                ))}
     
    </div>
  )
}

export default MyGroup
