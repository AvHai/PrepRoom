import React from 'react'
import loadingIcon from '../assets/loading.svg'
const Loading = () => {
  return (
    <div className='w-screen h-screen fixed   bg-black top-0 right-0 flex justify-center items-center'>
        <img src={loadingIcon} width={150} alt="Loading" />
        </div>
  )
}

export default Loading