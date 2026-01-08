import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail, validatePassword } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'

const Signup = () => {
  const [profilePic , setProfilePic] = useState(null)
  const [fullName , setFullName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [adminToken , setAdminToken] = useState("")
  const [error , setError] = useState(null)

  const handleSubmit = async(e) => {
      e.preventDefault();

      if(!fullName){
        setError("Please enter your full name");
        return;
      }
      if(!validateEmail(email)){
        setError("Please enter a valid email address");
        return;
      }
      if(!password){
        setError("Please enter your password");
        return;
      }
      if(password.length <8){
        setError("Password must be at least 8 characters long");
        return;
      }
      if(!validatePassword(password)){
        setError("Password must contain at least one letter and one number");
        return;
      }
      setError("");
    }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center gap-3'>
        <h3 className='font-semibold text-xl text-black'>Create an Account</h3>
        <p className='text-slate-700 text-xs mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSubmit}>
          <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap3'>

          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup