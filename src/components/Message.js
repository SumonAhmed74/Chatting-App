import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical,BsCamera} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'
import { useSelector} from 'react-redux'
import { getDatabase, push, ref, set, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import {Modal,Typography,Box,Button,LinearProgress,Alert} from '@mui/material'
import { 
  getStorage, 
  ref as sref, 
  uploadBytesResumable, 
  getDownloadURL 
  } from "firebase/storage";
import moment from 'moment'

const Message = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const [msg,setMsg]=useState('')
  const [msgList,setMsgList]=useState([])
  const [groupMsgList,setGroupMsgList]=useState([])
  const [open,setOpen] = useState(false)
  const [file,setFile] = useState(null)
  const [progress,setProgress]= useState('')
  const [member,setMember]= useState('')

  const user = useSelector((state)=> state.activeChat.value)

  const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  const date = new Date();
  const hours = date.getHours();
  const number = moment(hours, ["H"]).format("h");

  const sendTime = (`${weekday[date.getDay()]} AT ${addZero(number)}:${addZero(date.getMinutes())} ${hours >= 12 ?'PM':'AM'}`)

  const writeMsgHandle =(e)=>{
    setMsg(e.target.value)
  }

  const sendMsgHandler = ()=>{
     if(msg != ""){
      if(user.status == "gruph"){
        console.log("ati akti gruph mag")
        set(push(ref(db,"groupMsg")),{
          msg: msg,
          time: sendTime,
          whoSenderName: auth.currentUser.displayName,
          whoSenderId: auth.currentUser.uid,
          whoReciverName: user.name,
          whoReciverId: user.id,
        })
      }else{
        set(push(ref(db,"singleMsg")),{
          msg: msg,
          time: sendTime,
          whoSenderName: auth.currentUser.displayName,
          whoSenderId: auth.currentUser.uid,
          whoReciverName: user.name,
          whoReciverId: user.id,
        }).then(()=>{
          setMsg('')
        })
      }
     }
  }

  useEffect(()=>{
    const singleMsgRef = ref(db, 'singleMsg/');
      onValue(singleMsgRef, (snapshot) => {
        const msgListArr = [];
        snapshot.forEach((item)=>{
          if((item.val().whoSenderId==auth.currentUser.uid &&
             user.id==item.val().whoReciverId) ||
             (item.val().whoSenderId==user.id &&
             item.val().whoReciverId==auth.currentUser.uid )
          )
         
          msgListArr.push(item.val())
        })
        setMsgList(msgListArr)
      });
  },[user.id])

  useEffect(()=>{
    const groupMsgRef = ref(db, 'groupMsg/');
      onValue(groupMsgRef, (snapshot) => {
        const groupmsgListArr = [];
        snapshot.forEach((item)=>{
         
          groupmsgListArr.push(item.val())
        })
        setGroupMsgList(groupmsgListArr)
      });
  },[user])


  useEffect(()=>{
    if(user.status=="gruph"){
      console.log("Yes Group")
      const groupMembarArr=[];
      const groupMembarRef = ref(db, 'groupMembars/');
      onValue(groupMembarRef, (snapshot) => {
        snapshot.forEach((item)=>{
          if(auth.currentUser.uid==item.val().userId && item.val().groupId==user.id || auth.currentUser.uid==item.val().adminId && item.val().groupId==user.id){
            setMember(item.val().groupId)
            console.log("gorup Milscey")
          }
          
        })
      });
    }
  },[user])

  const handleOpen = () => setOpen(true);

  const handleClose =()=>{
    setOpen(false)
  }

  const msgImgUrlHandler =(e)=>{
    setFile(e.target.files[0])
  }
 
  const msgImgUploadHandler =()=>{
    const SingleImgRef = sref(storage, 'MsgSingleImages');
    const uploadTask = uploadBytesResumable(SingleImgRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress)
   
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(file != ""){
        if(user.status == "gruph"){
          console.log("ati akti gruph photo")
          set(push(ref(db,"groupMsg")),{
            img: downloadURL,
            time: sendTime,
            whoSenderName: auth.currentUser.displayName,
            whoSenderId: auth.currentUser.uid,
            whoReciverName: user.name,
            whoReciverId: user.id,
          }).then(()=>{
            setFile('')
            setProgress(null)
            setOpen(false)
          })
        }else{
          set(push(ref(db,"singleMsg")),{
            img: downloadURL,
            time: sendTime,
            whoSenderName: auth.currentUser.displayName,
            whoSenderId: auth.currentUser.uid,
            whoReciverName: user.name,
            whoReciverId: user.id,
          }).then(()=>{
            setFile('')
            setProgress(null)
            setOpen(false)
          })
        }
       }
    });
  }
);
  }
console.log(msgList)
 


  return (
    <div>
      <div className='MessageChat'>
       <div className='ChattingArea'>
       <div className='topAreaBox'>
        <div className='profileBox'>
        <div className='image'>
          <img src='../assets/images/avatar.png'/>
          <div className='round'></div>
        </div>
        <div className='nameBox'>
          <h2>{user.name}</h2>
          <p>Online</p>
        </div>
        </div>
        <BsThreeDotsVertical className='menuIcon'/>
       </div>
    {user.status=="gruph"
    ?
    user.id==member
      ?
      <>
      <div className='messageAreaBox'>
      {user.status=="gruph"
      ?
      groupMsgList.map(item=>(
        auth.currentUser.uid == item.whoSenderId
        ?
      <>
      {item.msg
      ?
      item.whoReciverId == user.id &&
      <div className='msg' style={alignRight}>
      <h5 className='name' style={dateReceive}>{item.whoSenderName}</h5>
      <p className='receiveShape' style={msgReceive}>{item.msg}</p>
      <h6 style={dateReceive}>{item.time}</h6>
      </div>
      :
      item.whoReciverId == user.id &&
      <div className='msg' style={alignRight}>
      <h5 className='name' style={dateReceive}>{item.whoSenderName}</h5>
      <img style={imgSend} src={item.img}/>
      <h6 className='imgDate' style={dateReceive}>{item.time}</h6>
      </div>
      }
      </>
        :
      <>
        {item.msg
        ?
        item.whoReciverId == user.id &&
        <div className='msg' style={alignLeft}>
        <h5 className='name' style={dateReceive}>{item.whoSenderName}</h5>
        <p className='sendShape' style={msgSend}>{item.msg}</p>
        <h6 style={dateSend}>{item.time}</h6>
      </div>
        :
        item.whoReciverId == user.id &&
        <div className='msg' style={alignLeft}>
        <h5 className='name' style={dateReceive}>{item.whoSenderName}</h5>
        <img style={imgReceive} src={item.img}/>
        <h6 className='imgDate' style={dateSend}>{item.time}</h6>
      </div>
      }
      </>
      ))
      :
      msgList.map(item=>(
        auth.currentUser.uid == item.whoSenderId
        ?
      <>
      {item.msg
      ?
      <div className='msg' style={alignRight}>
      <p className='receiveShape' style={msgReceive}>{item.msg}</p>
      <h6 style={dateReceive}>{item.time}</h6>
      </div>
      :
      <div className='msg' style={alignRight}>
      <img style={imgSend} src={item.img}/>
      <h6 className='imgDate' style={dateReceive}>{item.time}</h6>
      </div>
      }
      </>
        :
      <>
        {item.msg
        ?
        <div className='msg' style={alignLeft}>
        <p className='sendShape' style={msgSend}>{item.msg}</p>
        <h6 style={dateSend}>{item.time}</h6>
      </div>
        :
        <div className='msg' style={alignLeft}>
        <img style={imgReceive} src={item.img}/>
        <h6 className='imgDate' style={dateSend}>{item.time}</h6>
      </div>
      }
      </>
      ))
      }
      
            
      </div>
      <div className='writeAreaBox'>
      <div className='inputBox'>
      <input onChange={writeMsgHandle} className='textField' type="text" placeholder='Enter a text...' value={msg}/>
      <BsCamera className='cameraIcon' onClick={handleOpen} />
      <FiSend className='sendIcon' onClick={sendMsgHandler} />
      </div>
      <div className='IconBox'>

      </div>

      </div>

      </>
      :
      <Alert severity="error">You are not a member of this {user.name} group!</Alert>
      
    :
    <>
      <div className='messageAreaBox'>

  {msgList.map(item=>(
    auth.currentUser.uid == item.whoSenderId
    ?
  <>
  {item.msg
  ?
  <div className='msg' style={alignRight}>
  <p className='receiveShape' style={msgReceive}>{item.msg}</p>
  <h6 style={dateReceive}>{item.time}</h6>
  </div>
  :
  <div className='msg' style={alignRight}>
  <img style={imgSend} src={item.img}/>
  <h6 className='imgDate' style={dateReceive}>{item.time}</h6>
  </div>
  }
  </>
    :
  <>
    {item.msg
    ?
    <div className='msg' style={alignLeft}>
    <p className='sendShape' style={msgSend}>{item.msg}</p>
    <h6 style={dateSend}>{item.time}</h6>
  </div>
    :
    <div className='msg' style={alignLeft}>
    <img style={imgReceive} src={item.img}/>
    <h6 className='imgDate' style={dateSend}>{item.time}</h6>
  </div>
  }
  </>

  ))}
            
      </div>
      <div className='writeAreaBox'>
      <div className='inputBox'>
      <input onChange={writeMsgHandle} className='textField' type="text" placeholder='Enter a text...' value={msg}/>
      <BsCamera className='cameraIcon' onClick={handleOpen} />
      <FiSend className='sendIcon' onClick={sendMsgHandler} />
      </div>
      <div className='IconBox'>

      </div>

      </div>

      </>
    }
        

       </div>
        
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Send Images:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <input type="file" onChange={msgImgUrlHandler} style={{margin:"15px 0"}}/>
        </Typography>
        {progress>0 &&
        <>
        <LinearProgress variant="determinate" value={progress}  style={{width:"90%",display:"inline-block"}} />
        <span>{progress}%</span>
        </>
        }
        <Button variant="contained" onClick={msgImgUploadHandler} style={{marginTop:"10px"}}>Upload Photo</Button>
      </Box>
    </Modal>
    </div>
  )
}

const msgSend ={
  background:'#F1F1F1'
}
const msgReceive ={
  background:'#5F35F5',
  color: '#ffff',
}

const alignLeft = {
  display:'flex',
  justifyContent:'flex-start',
}
const alignRight = {
  display:'flex',
  justifyContent:'flex-end',
}

const dateSend={
  left:'2px',
}
const dateReceive={
  right:'2px',
}

const imgReceive={
  background:'#F1F1F1',
}
const imgSend={
  background:'#5F35F5',
}

const imgDateSend={
  bottom:'13px',
}
const imgDateReceive={
  right:'13px',
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

export default Message
