import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import {RiMessage2Line} from 'react-icons/ri'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {HiUserGroup} from 'react-icons/hi'
import { getAuth} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { activeName } from '../reducers/activeChatSlice';
import { Modal,Backdrop,Fade,Box,
  Typography,ListItem,ListItemAvatar,
  Avatar,ListItemText,Button,Alert } from '@mui/material';


const GruphList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const dispatch = useDispatch();
    const [groupList,setGroupList]=useState([])
    const [groupMembar,setGroupMembar]=useState([])
    const [open, setOpen] = React.useState(false);
  
    
    useEffect(()=>{
      const groupListRef = ref(db, 'groups/');
        onValue(groupListRef, (snapshot) => {
          const groupListErr = [];
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
        status: "gruph",
        name: info.groupName,
        id: info.groupId,
        grupAdminId: info.adminId,
      }
      dispatch(activeName(gruphUserInfo))
      }
      const handleClose = () => setOpen(false);

      const membarShowIconHandaler=(item)=>{
      setOpen(true)
      const groupListRef = ref(db, 'groupMembars/');
      onValue(groupListRef, (snapshot) => {
        const groupMembarErr = [];
        snapshot.forEach((group)=>{
          if(item.groupId == group.val().groupId){
            groupMembarErr.push({
              userName: group.val().userName,
              userId: group.val().userId,
              userProfile: group.val().userProfile,
              id: group.key,
            })
          }
         
        })
       setGroupMembar(groupMembarErr)
      });
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
               <button style={{marginRight:"10px"}} >
               <RiMessage2Line />
               </button>
               <button onClick={()=>membarShowIconHandaler(info)}>
               <HiUserGroup />
               </button>
           </div>
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
                <h2>Total Member:{groupMembar.length}</h2>
                {groupMembar.map((item)=>(
                   <ListItem alignItems="flex-start">
                   <ListItemAvatar>
                     <Avatar alt="Remy Sharp" src={item.userProfile}/>
                   </ListItemAvatar>
                   <ListItemText
                     primary={item.userName}
                     secondary={
                       <React.Fragment>
                         <Typography
                           sx={{ display: 'inline' }}
                           component="span"
                           variant="body2"
                           color="text.primary"
                         >
                           {item.userName}
                         </Typography>
                         {" — is a member of this group"}
                       </React.Fragment>
                     }
                   />
                 </ListItem>
                ))}
                </Box>
              </Fade>
            </Modal>
                </div>
              ))}
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

export default GruphList