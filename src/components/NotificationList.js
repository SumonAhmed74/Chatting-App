import React from 'react'
import {IoMdNotifications} from 'react-icons/io'


const NotificationList = (props) => {
  return (
    <div className='NotificationBox'>
      {props.list.map((item)=>(
        <div className='box'>
        <IoMdNotifications className='icon'/>
        <p>{item.userName} is interested in joining your <strong>{item.groupName}</strong> group, Please join the group!</p>
    </div>
      ))}
        
        {/* <div className='box'>
            <IoIosNotificationsOutline className='icon'/>
            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
        </div> */}
    </div>
  )
}

export default NotificationList
