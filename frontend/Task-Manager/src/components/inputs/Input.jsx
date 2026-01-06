import React, { useState } from 'react'
import {FaRegEye , FaRegEyeSlash} from 'react-icons/fa'

const Input = ({value,label,placeholder,type,onChange}) => {
    const [showPassword , setShowPassword] = useState(false)

    const handlePassword = () =>{
        setShowPassword(!showPassword)
    }
  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='input-box'>
        <input    
          type = {
            type =='password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value}
          placeholder={placeholder}
          onChange={(e)=>onChange(e)}
          className = "outline-none bg-transparent w-full"
        />

          {
            type === 'password' && (
                <>
                    {showPassword ? (
                    <FaRegEye size={22} onClick={handlePassword} className='text-primary cursor-pointer'/>
                    ):
                    (<FaRegEyeSlash size={22} onClick={handlePassword} className='text-primary cursor-pointer'/>)}
                </>
            )
          }
        </div>
    </div>
  )
}

export default Input