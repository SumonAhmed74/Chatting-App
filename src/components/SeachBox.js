import React from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs'


const SeachBox = () => {
  return (
    <div className='searchBox'>
       <input placeholder='Search'/>
       <div className='searchIcon'>
        <BsSearch />
       </div>
       <div className='menu'>
        <BsThreeDotsVertical />
       </div>
    </div>
  )
}

export default SeachBox