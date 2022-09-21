import { color } from '@mui/system'
import React from 'react'
import {BsThreeDotsVertical,BsCamera} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'
import { useSelector} from 'react-redux'

const Message = () => {
  const user = useSelector((state)=> state.activeChat.value)
  console.log(user)
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
       <div className='messageAreaBox'>
        <div className='msg' style={alignLeft}>
          <p className='sendShape' style={msgSend}>Hey There ! lor kjfkd dkfjdkf dkfjdf dfjdf dkfdf dkfj dskf dfkjdkfd fkdff dfjdf dfjdsf dfjdf dfjds fdsjfdf d fds fkdsjfdss fdkfd fkdfds fd fdfd fd fdjsfjdoifwejfd fkdfd fijfkdf kd fidsjffd fdsffjdifjdfj dfj djf</p>
          <h6 style={dateSend}>Today, 2:01pm</h6>
        </div>
        
        <div className='msg' style={alignRight}>
          <p className='receiveShape' style={msgReceive}>Hey There ! lor kjfkd dkfjdkf dkfjdf dfjdf dkfdf dkfj dskf dfkjdkfd fkdff dfjdf dfjdsf dfjdf dfjds fdsjfdf d fds fkdsjfdss fdkfd fkdfds fd fdfd fd fdjsfjdoifwejfd fkdfd fijfkdf kd fidsjffd fdsffjdifjdfj dfj djf</p>
          <h6 style={dateReceive}>Today, 2:01pm</h6>
        </div>
       
        <div className='msg' style={alignRight}>
          <img style={imgSend} src='../assets/images/lapIT.jpg'/>
          <h6 className='imgDate' style={dateReceive}>Today, 2:01pm</h6>
        </div>
     
        <div className='msg' style={alignLeft}>
          <img style={imgReceive} src='../assets/images/lapIT.jpg'/>
          <h6 className='imgDate' style={dateSend}>Today, 2:01pm</h6>
        </div>
        
        <div className='msg' style={alignRight}>
          <p className='receiveShape' style={msgReceive}>Hey There !</p>
          <h6 style={dateReceive}>Today, 2:01pm</h6>
        </div>
        
       </div>
       <div className='writeAreaBox'>
        <div className='inputBox'>
        <input className='textField' type="text" placeholder='Enter a text...'/>
        <BsCamera className='cameraIcon' />
        <FiSend className='sendIcon' />
        </div>
        <div className='IconBox'>
        
        </div>

       </div>
       </div>
        
    </div>
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

export default Message
