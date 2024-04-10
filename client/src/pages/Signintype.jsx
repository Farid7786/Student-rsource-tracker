import React from 'react'
import { Link } from 'react-router-dom';
import AdityaLogo from '../assets/aditya.svg'; // Import the SVG file
function Signintype() {
  return (
    <div className='p-10 relative'>
  <div className=' bg-white max-w-lg mx-auto mt-24 rounded-lg p-3 opacity-55 xs:max-w-sm relative'>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRET6R_gXVVQDJNUmyog8sULGtLthZkJCa3jzOSYGSUig&s" alt="adityalms" className='w-3/4 mx-auto opacity-50' />
  </div>
  <div className='absolute inset-0 flex gap-10 justify-center items-center mt-12 '>
    <Link to='/facultysignin'>
      <button className='border-none p-3 rounded-2xl text-white' style={{backgroundColor:'#071845'}}>Faculty Login</button>
    </Link>
    <Link to='/studentsigin'>
      <button className='border-none p-3 rounded-2xl text-white' style={{backgroundColor:'#071845'}}>Student Login</button>
    </Link>
  </div>
</div>



  )
}

export default Signintype
