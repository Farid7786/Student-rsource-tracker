import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userslice';

function StudentSignin() {
  const [formdata, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value,
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/student/signin',
      {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
        },
        body : JSON.stringify(formdata),
      }
    );
    const data = await res.json();
    console.log(data);
    if(data.success ===  false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/Stuprofile');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="bg-white p-4 sm:p-8 md:p-12 mt-8 rounded-lg max-w-lg mx-auto">
      <div className="flex items-center">
        <Link to='/'>
          <FaArrowLeft className='hover:opacity-50' style={{ color: 'black', fontSize: '1.5rem' }} />
        </Link>
        <h1 className="text-2xl font-semibold ml-4">SignIn</h1>
      </div>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" placeholder="Example@gmail.com" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" id="email" onChange={handleChange}/>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" placeholder="Password" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" id="password" onChange={handleChange}/>
        </div>
        <div className="mt-6">
          <button type="submit" disabled= { loading } className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium uppercase disabled:opacity-50 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" style={{backgroundColor: '#071845'}} >
            {loading ? 'loading...' : 'Signin'}
          </button>
        </div>
      </form>
      <div className='mt-3'>
        <span>Dont have an account?</span>
        <Link to='/studentsignup'>
          <span className='text-blue-800 ml-1'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}

export default StudentSignin;
