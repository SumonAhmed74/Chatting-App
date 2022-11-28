import React,{useEffect, useState} from 'react'
import {Modal,Box,Typography } from '@mui/material';
import {AiOutlineHome,AiOutlineMessage,AiOutlineCloudUpload} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {GoSignOut} from 'react-icons/go'
import { getAuth, signOut,onAuthStateChanged,updateProfile } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getDatabase, push, ref as nref, set, onValue } from 'firebase/database'
import { useNavigate,Link } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSelector,useDispatch} from 'react-redux'
import { notification, notificationArry } from '../reducers/notificationSlice';
import { notificationList } from '../reducers/notificationListArr';


const Leftbar = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const db = getDatabase();
    const dispatch=useDispatch();
    const storage = getStorage();

    const [image, setImage] = useState();
    // const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();

    const [profilName,setProfileName] = useState('')
    const [email,setEmail] = useState('')
    const [id,setId] = useState('')
    const [creationTime,setCreationTime] = useState('')
    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)
    const [loading,setLoading] = useState(false)
    const [change,setChange] = useState(false)
    const [groupNotifyList,setGroupNotifyList] = useState([])

    const data=useSelector((state)=>state)

    const handleModalOpen = ()=>{
        setOpen(true)
    }

    const handleClose =()=>{
        setOpen(false)
    }
    const handleModalOpen2 = ()=>{
        setOpen2(true)
    }

    const handleClose2 =()=>{
        setOpen2(false)
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
            setEmail(user.email)
            setId(user.uid)
            setCreationTime(user.metadata.creationTime)
          }
        });
      },[change])

      const profileUploadHandler = (e)=>{
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
    
      const getCropData = () => {
        setLoading(true)
        if (typeof cropper !== "undefined") {
          const storageRef = ref(storage, auth.currentUser.uid);

            const message4 = cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
              setLoading(false)
              setOpen2(false)
              getDownloadURL(storageRef)
                .then((url) => {
                  updateProfile(auth.currentUser, {
                   photoURL: url
                  }).then(() => {
                    setChange(!change)
                  }).catch((error) => {
                    console.log(error)
                  });
                })
            });
        }
        
      };

      useEffect(()=>{
        const groupNotifyRef = nref(db, 'groupNotifications/');
          onValue(groupNotifyRef, (snapshot) => {
            const groupNotifyListArr = [];
            snapshot.forEach((item)=>{
             
              groupNotifyListArr.push(item.val())
            })
            setGroupNotifyList(groupNotifyListArr)
            dispatch(notification(groupNotifyListArr.length))
          })
         
      },[db])
   

  return (
     <div className='leftbar'>
        <div className='profileImgBox'>
            {!auth.currentUser.photoURL
            ?
            <img className='profile-img' src='./assets/images/avatar.png' />
            :
           <img className='profile-img' src={auth.currentUser.photoURL} />
            }
          
          <div className='overly' onClick={handleModalOpen2}>
            <AiOutlineCloudUpload />
          </div>
        </div>
     
     <h5 onClick={handleModalOpen}>{profilName}</h5>
     <div className='icons'>
        <ul>
            <li className={props.active=='home' && 'active'}>
               <Link to='/home'>
               <AiOutlineHome className='icon'/>
               </Link>
            </li>          
            <li className={props.active=='msg' && 'active'}>
               <Link to='/chat'>
               <AiOutlineMessage className='icon'/>
               </Link>
              
            </li>          
            <li className={props.active=='notification' && 'active'}>
            <Link to='/notification'>
            <IoMdNotifications className='icon'/>
               </Link>
               {data.notification.amount == '0'
               ?
              ''
               :
               groupNotifyList &&
                <span className='badge'>{data.notification.amount}</span>
                
               }
               
               
            </li>          
            <li className={props.active=='setting' && 'active'}>
            <Link to='/setting'>
            <FiSettings className='icon'/>
               </Link>
                
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
        <h2>Account Informations</h2>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <ul className='info'>
            <li><span>Your Email: </span>{email}</li>
            <li><span>Users id: </span>{id}</li>
            <li><span>Your Create Time: </span>{creationTime}</li>
        </ul>
        </Typography>
  </Box>
</Modal>

     <Modal 
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
    >
    <Box className='modalBox2'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        <h2>Update Profile:</h2>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>

        <div className='profileImgBox'>
        {!auth.currentUser.photoURL
            ?
            image
            ?
            <div className="img-preview"> </div>
            :
            <img className='profile-img' src='./assets/images/avatar.png' />
            :
            image
            ?
            <div className="img-preview"> </div>
            :
            <img className='profile-img' src={auth.currentUser.photoURL} />
            }
        </div>
        

            <input type="file" onChange={profileUploadHandler}/>

            <Cropper
          style={{ height:"200px", width: "200px" }}
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
         {image ?
          loading
          ?
          <button>
          Loading...
        </button>
          :
          <button onClick={getCropData}>
          Upload Profile Pic
        </button>
        :
        ""
         }
        

        </Typography>
  </Box>
</Modal>
     </div>
  )
}

export default Leftbar