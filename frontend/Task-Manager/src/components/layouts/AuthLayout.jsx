import React from 'react'
import UI_IMG from '../../assets/front-page-image.webp'

const AuthLayout = ({children}) => {
  return (
    <div className='flex '>
        <div className='w-screen h-screen md:w-[60vw] p-12 '>
            <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            {children}
        </div>
        <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-white'>
            <img src={UI_IMG} alt="Task UI" className='w-80 lg:w-[90%] h-[80%]'  />
        </div>
    </div>
  )
}

export default AuthLayout