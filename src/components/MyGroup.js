import React, { useEffect } from 'react'
import { getDatabase, ref, set, push, onValue,remove } from "firebase/database";
import { getAuth, updateProfile  } from "firebase/auth";
import { useState } from "react";
import { Modal,Backdrop,Fade,Box,
  Typography,ListItem,ListItemAvatar,
  Avatar,ListItemText,Button,Alert } from '@mui/material';

const MyGroup = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [groupList,setGroupList]=useState([])
    const [groupJoinList,setGroupJoinList]=useState([])
    const [open, setOpen] =useState(false);
    // const [accept,setAccept]=useState(false)


    useEffect(()=>{
        const groupListRef = ref(db, 'groups/');
          onValue(groupListRef, (snapshot) => {
            const groupListErr = [];
            snapshot.forEach((item)=>{
              groupListErr.push({
                id:item.key,
                groupName: item.val().groupName,
                groupTagline: item.val().groupTagline,
                adminName: item.val().admin,
                adminId: item.val().adminId,
              })
              setGroupList(groupListErr)
            })
          });
      },[])

      const handleClose = () => setOpen(false);
     
      const HandleOpen=(grophItem)=>{
        setOpen(true);
          const groupJoinRef = ref(db, 'joinGroupRequest/');
            onValue(groupJoinRef, (snapshot) => {
              const groupJoinErr = [];
              snapshot.forEach((info)=>{
                if(info.val().adminId==auth.currentUser.uid && info.val().groupId==grophItem.id){
                  groupJoinErr.push({
                    id: info.key,
                    groupId: info.val().groupId,
                    groupName: info.val().groupName,
                    groupTagline: info.val().groupTagline,
                    adminId: info.val().adminId,
                    userName: info.val().userName,
                    userId: info.val().userId,
                    userProfile: info.val().userProfile,
                  })
                  
                }
                
              })
              setGroupJoinList(groupJoinErr)
            });
      }

      const requestRemoveHandler=(item)=>{
        remove(ref(db,'joinGroupRequest/'+item.id))
      }

      const requestAcceptHandler=(info)=>{
        set(push(ref(db, 'groupMembars')), {
          adminId: info.adminId,
          groupId: info.groupId,
          groupName: info.groupName,
          groupTagline: info.groupTagline,
          userId: info.userId,
          userName: info.userName,
          userProfile: info.userProfile,
          id: info.id,
        }).then(()=>{
          remove(ref(db,'joinGroupRequest/'+info.id))
          // setAccept(!false)
        })
      }


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
                              <button onClick={()=>HandleOpen(info)}>Info</button>
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
                                    {groupJoinList.length<=0 && <Alert severity="info">No join request here!</Alert>}
                                    {groupJoinList.map((group)=>(
                                      // auth.currentUser.uid == group.adminId &&
                                       <ListItem alignItems="flex-start">
                                       <ListItemAvatar>
                                         <Avatar alt="Remy Sharp" src={group.userProfile} />
                                       </ListItemAvatar>
                                       <ListItemText
                                         primary={group.userName}
                                         secondary={
                                           <React.Fragment>
                                             <Typography
                                               sx={{ display: 'inline' }}
                                               component="span"
                                               variant="body2"
                                               color="text.primary"
                                             >
                                               {group.userName}
                                             </Typography>
                                             {" — join wants this gruph!"}
                                             <Button onClick={()=>requestAcceptHandler(group)} style={{marginRight:"10px", marginTop:"10px"}} variant="contained" color="success" >
                                                Accept
                                              </Button>
                                            <Button onClick={()=>requestRemoveHandler(group)} style={{marginTop:"10px"}} variant="contained"  color="error">
                                                Reject
                                            </Button>
                                           </React.Fragment>
                                         }
                                       />
                                     </ListItem>
                                    ))}
                                  </Box>
                                </Fade>
                              </Modal>
                            </div>
                        </div>
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

export default MyGroup
