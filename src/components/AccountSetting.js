import React from 'react'
import {FaKey} from 'react-icons/fa'
import {CgDarkMode} from 'react-icons/cg'
import {RiDeleteBin6Fill} from 'react-icons/ri'

const AccountSetting = () => {
  return (
    <div className='profileSetting accountSetting'>
      <h2>Account Settings</h2>

        <div className='allEditItem'>
        <div className='editBox'>
            <FaKey className='editIcon'/>
            <h4>Account.</h4>
        </div>   
        <div className='editBox'>
            <CgDarkMode className='editIcon'/>
            <h4>Theme.</h4>
        </div>   
        <div className='editBox'>
            <RiDeleteBin6Fill className='editIcon'/>
            <h4>Delete Account.</h4>
        </div>   
        </div>

    </div>
  )
}

export default AccountSetting
