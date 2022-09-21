import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import {RiMessage2Line} from 'react-icons/ri'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { getAuth} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { activeName } from '../reducers/activeChatSlice';



const GruphList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const dispatch = useDispatch();
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
              groupId: item.key,
            })
          })
         setGroupList(groupListErr)
        });
    },[])


    const chatProfileNameHandler =(info)=>{
      const gruphUserInfo={
        name: info.groupName,
        id: info.groupId,
        grupAdminId: info.adminId,
      }
      dispatch(activeName(gruphUserInfo))
    }


  return (
    <div className='gruph-List'>
        <div className='topBox'>
        <h2>Groups List</h2>
        <BsThreeDotsVertical className='menuIcon'/>
        </div>

        {groupList.map(info=>(
          <div className='box' onClick={()=>chatProfileNameHandler(info)}>
          <div className='image'>
          <img src='../assets/images/groupAvater3.png'/>
          </div>
           <div className='name'>
               <h3>{info.groupName}</h3>
               <p>{info.groupTagline}</p>
               <p>{info.adminId == auth.currentUser.uid?"(Admin)":""}</p>
           </div>
           <div className='btn'>
               <button >
               <RiMessage2Line />
               </button>
           </div>
          </div>
        ))}
    </div>
  )
}


export default GruphList