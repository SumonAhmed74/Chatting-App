import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

const GruphList = () => {
  return (
    <div className='gruph-List'>
        <h2>Groups Request</h2>
            <BsThreeDotsVertical className='menuIcon'/>
       <div className='box'>
       <div className='image'>
        <img src='./assets/images/gruph-img1.png'/>
       </div>
        <div className='name'>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='btn'>
            <button>Accept</button>
        </div>
       </div>
       <div className='box'>
       <div className='image'>
        <img src='./assets/images/gruph-img2.png'/>
       </div>
        <div className='name'>
            <h3>Friends Forever</h3>
            <p>Good to see you.</p>
        </div>
        <div className='btn'>
            <button>Accept</button>
        </div>
       </div>
       <div className='box'>
       <div className='image'>
        <img src='./assets/images/gruph-img3.png'/>
       </div>
        <div className='name'>
            <h3>Crazy Cousins</h3>
            <p>What plans today?</p>
        </div>
        <div className='btn'>
            <button>Accept</button>
        </div>
       </div>
       <div className='box'>
       <div className='image'>
        <img src='./assets/images/profile-pic.jpg'/>
       </div>
        <div className='name'>
            <h3>Friends Forever</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='btn'>
            <button>Accept</button>
        </div>
       </div>
       <div className='box'>
       <div className='image'>
        <img src='./assets/images/profile-pic.jpg'/>
       </div>
        <div className='name'>
            <h3>Friends Forever</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='btn'>
            <button>Accept</button>
        </div>
       </div>
    </div>
  )
}

export default GruphList