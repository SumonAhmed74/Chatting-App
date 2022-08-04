import React,{useEffect, useState} from 'react'
import {Grid,Modal,Box,Typography } from '@mui/material';
import {AiOutlineHome,AiOutlineMessage} from 'react-icons/ai'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {GoSignOut} from 'react-icons/go'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react';


const Leftbar = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [profilName,setProfileName] = useState('')
    const [open,setOpen] = useState(false)


    const handleModalOpen = ()=>{
        setOpen(true)
    }

    const handleClose =()=>{
        setOpen(false)
    }

    const logOutHandle =()=>{
        signOut(auth).then(() => {
            navigate('/login')
          }).catch((error) => {
            console.log(error)
          });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setProfileName(user.displayName) 
          }
        });
      },[])

  return (
     <div className='leftbar'>
     <img className='profile-img' src='./assets/images/profile-pic.jpg'/>
     <h5 onClick={handleModalOpen}>{profilName}</h5>
     <div className='icons'>
        <ul>
            <li className={props.active=='home' && 'active'}>
                <AiOutlineHome className='icon'/>
            </li>          
            <li className={props.active=='msg' && 'active'}>
                <AiOutlineMessage className='icon'/>
            </li>          
            <li className={props.active=='notification' && 'active'}>
                <IoIosNotificationsOutline className='icon'/>
            </li>          
            <li className={props.active=='setting' && 'active'}>
                <FiSettings className='icon'/>
            </li>          
            <li>
                <GoSignOut className='icon' onClick={logOutHandle}/>
            </li>          
        </ul>
     </div>
     <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
    >
    <Box className='modalBox'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
  </Box>
</Modal>
     </div>
  )
}

export default Leftbar