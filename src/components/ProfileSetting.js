import React, { useState } from 'react'
import {RiEdit2Fill} from 'react-icons/ri'
import {HiCreditCard} from 'react-icons/hi'
import {CgProfile} from 'react-icons/cg'
import {FiHelpCircle} from 'react-icons/fi'
import { getAuth,updateProfile } from "firebase/auth";
import {Backdrop,Box,Modal,Fade,Typography,TextField,Button }from '@mui/material';
import { getDatabase, ref, set } from "firebase/database";

const ProfileSetting = () => {
    const auth = getAuth();
    const db = getDatabase();

    const [open,setOpen] = useState(false);
    const [editName,setEditName] = useState('')
    const handleClose = () => setOpen(false);

    const editProfileNameHandler =()=>{
      setOpen(true)
    }

    const editNameSubmitHandler=()=>{
      updateProfile(auth.currentUser, {
        displayName: editName,
      }).then(() => {
        set(ref(db, 'users/'+auth.currentUser.uid), {
          username: editName,
        });
      }).catch((error) => {
        console.log("EditName err", error)
      });
      setOpen(false)
    }

  return (
    <div className='profileSetting'>
      <h2>Profile Settings</h2>
      <div className='box'>
         <div className='image'>
         {!auth.currentUser.photoURL
            ?
            <img className='profile-img' src='./assets/images/avatar.png' />
            :
           <img className='profile-img' src={auth.currentUser.photoURL} />
            }
         </div>
         <div className='name'>
           <h3>{auth.currentUser.displayName}</h3>
            <p>Stay home stay safe</p>
         </div>   
        </div>

        <div className='allEditItem'>
        <div className='editBox' onClick={editProfileNameHandler}>
            <RiEdit2Fill className='editIcon'/>
            <h4>Edit Profile Name.</h4>
        </div>  
        <div className='editBox'>
            <HiCreditCard className='editIcon'/>
            <h4>Edit Profile Status Info.</h4>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Change your Profile Name:
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField fullWidth label="Edit Name:" id="fullWidth" onChange={(e)=>setEditName(e.target.value)} />
                  <Button onClick={editNameSubmitHandler} style={{width:"100%",marginTop:"15px"}} variant="contained" disableElevation>
                    Submit
                  </Button>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
        </div>  
        <div className='editBox'>
            <CgProfile className='editIcon'/>
            <h4>Edit Profile Photo.</h4>
        </div>  
        <div className='editBox'>
            <FiHelpCircle className='editIcon'/>
            <h4>Help.</h4>
        </div>  
        </div>

    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ProfileSetting
