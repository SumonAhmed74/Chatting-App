import React, { useEffect } from 'react'
import { Modal, Box,TextField } from '@mui/material'
import { useState } from 'react'
import { getStorage, uploadString, getDownloadURL  } from "firebase/storage";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth, updateProfile  } from "firebase/auth";

const GruphRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    const storage = getStorage();

    const [open,setOpen]=useState(false)
    const [groupName,setGroupName]=useState('')
    const [groupTagline,setGroupTagline]=useState('')
    const [groupNameErr,setGroupNameErr]=useState('')
    const [groupTaglineErr,setGroupTaglineErr]=useState('')
    const [groupList,setGroupList]=useState([])
    const [check,setCheck]= useState(false)
    
    const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
    const [url,setUrl]=useState('')
    

    const createGrupHandler =()=>{
        setOpen(true)
    }

    const handleClose =()=>{
        setOpen(false)
    }

   

    const createModalBtnHandler =(e)=>{
        if(!groupName){
            setGroupNameErr("Enter your groph name!")
        }
        else if(!groupTagline){
            setGroupTaglineErr("Enter your groph Tagline!")
            setGroupNameErr("")
        }
        else{
            setGroupTaglineErr("")
              set(push(ref(db, 'groups')), {
                groupName: groupName,
                groupTagline: groupTagline,
                adminId: auth.currentUser.uid,
                admin: auth.currentUser.displayName,
              }).then(()=>{
                setOpen(false)
                setCheck(!check)
              })
        }  
    }

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
    },[check])

    const JoinRequestHandler = (item)=>{
      set(push(ref(db, 'joinRequest')), {
       adminId: item.adminId,
       groupId: item.groupId,
       userName: auth.currentUser.displayName,
       userId: auth.currentUser.uid,
       userProfile: auth.currentUser.photoURL,
      })
    }

    const grupProfileUploadHandler =(e)=>{
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

   
    // const url = URL.createObjectURL(e.target.files[0])
    // setUrl(url)
    const getCropData = () => {
      if (typeof cropper !== "undefined") {
        const storageRef = ref(storage, 'aaaa');
        const message4 = cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          getDownloadURL(storageRef)
            .then((url) => {
              setImage(url)
              setOpen(false)
            }).catch((error)=>{
              console.log(error)
            })
        });
        
      }
    };

  return (
    <div className='gruph-List'>
        <h2>Groups Request</h2>
        <div className='createbtn'>
            <button onClick={createGrupHandler}>Create Groups</button>
        </div>

        {groupList.map(info=>(
          auth.currentUser.uid != info.adminId &&
          <div className='box'>
          <div className='image'>
          <img src='../assets/images/groupAvater3.png'/>
          </div>
           <div className='name'>
               <h3>{info.groupName}</h3>
               <p>{info.groupTagline}</p>
           </div>
           <div className='btn'>
               <button onClick={()=>JoinRequestHandler(info)}>Join</button>
           </div>
          </div>
        ))}
       
       <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className='grophModalBox'>
    <h3>Fill the field with proper information:</h3>
    <TextField
        helperText={groupNameErr}
        id="demo-helper-text-misaligned"
        label="Groph Name:"
        className='textFiled'
        onChange={(e)=>setGroupName(e.target.value)}
      />
    <TextField
        helperText={groupTaglineErr}
        id="demo-helper-text-misaligned"
        label="Groph Tagline:"
        className='textFiled'
        onChange={(e)=>setGroupTagline(e.target.value)}
      />

        <div className='GruphPicUpload'>
            <div className='box'>
              {/* {!image
              ?
              image
              ?
              <div className='img-preview'/>
              :
              <img src='../assets/images/bargar1.png'/>
              :
              image
              ?
              <div className='img-preview'/>
              :
              <img src={image}/>
              } */}
              <img src='../assets/images/groupAvater3.png'/>
               <input type="file" onChange={grupProfileUploadHandler}/>
            </div>
           
        </div>

        <div className='imgCropperBox'>
        <Cropper
              style={{  height:"200px", width: "200px"  }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />

            {image 
            ?
            <button onClick={getCropData}>
              Upload Group Pic
            </button>
            :
            ''
            }
        </div>
           
        
       <div className='createModalBtn'>
            <button onClick={createModalBtnHandler}>Create Groups</button>
        </div>
  </Box>
</Modal>
    </div>
  )
}

export default GruphRequest
