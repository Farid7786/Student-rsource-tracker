import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

import AdityaLogo from '../assets/aditya.svg'; // Import the SVG file

function Header() {
  const { newUser } = useSelector((state) => state.user);
  
  return (
    <header className='shadow-md flex p-5' style={{ backgroundColor:'#071845' }}>
      <div className='flex p-3 max-w-6xl items-center justify-between'>
        <div className="flex items-center"> {/* Wrap image and h1 in a div */}
          <Link to='/'>
            {/* Use img tag to include the SVG image */}
            <img src={AdityaLogo} alt="Aditya Engineering College" className='h-8 w-auto' />
          </Link>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap ml-3'>
            <span style={{ color:'#FFFEFE' }}>Aditya Engineering College </span>
          </h1>
        </div>
      </div>
      <ul className='flex gap-10 items-center mx-auto'>
        <Link to='/'>
          <li className='text-white hover:underline hidden sm:inline'>Home</li>
        </Link>
        <Link to='/about'>
          <li className='text-white hover:underline hidden sm:inline'>About</li>
        </Link>
        <Link to='/campuslife'>
          <li className='text-white hover:underline hidden sm:inline'>Campus Life</li>
        </Link>
        <Link to='/department'>
          <li className='text-white hover:underline hidden sm:inline'>Departments</li>
        </Link>
      </ul>
      <ul>
        <div>
          {newUser ? (
            <img className=" h-24 w-24 rounded-sm" src={newUser.avatar} alt="User Avatar"  />
          ) : (
            <div className='hover:opacity-65 flex'>
              <FaUser className='mt-4' style={{ color: 'white' }} />
              <Link to='/signintype'>
                <li className='text-white p-3'>Login / Signup</li>
              </Link>
              </div>
          )}
        </div>
      </ul>
    </header>
  );
}

export default Header;
