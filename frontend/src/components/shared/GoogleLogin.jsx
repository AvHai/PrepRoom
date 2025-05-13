import React from 'react'
import { Button } from '../ui/button'
import {FcGoogle} from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/helpers/firebase'
import { useNavigate } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { setUser } from '@/redux/user/userSlice'
import { useDispatch } from 'react-redux'

export const GoogleLogin = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.log('click');
        const googleResponse = await signInWithPopup(auth,provider)
        const user = googleResponse.user
        const bodyData ={
            name : user.name,
            email : user.email,
        }
        try {
                  const response = await fetch(
                    `${getEnv('VITE_API_BASE_URL')}/auth/google-login`,
                    {
                      method: "post",
                      headers: { "Content-type": "application/json" },
                      credentials: 'include',
                      body: JSON.stringify(bodyData),
                    }
                  );
                  const data = await response.json();
                  if (!response.ok) {
                    return showToast("error", data.message);
                  }
                  dispatch(setUser(data.user))
                  navigate(RouteIndex);
                  showToast("success", data.message);
                } catch (error) {
                  showToast("error", error.message);
                }
    }
  return (
    <Button variant='outline' className='w-full' out onClick={handleLogin}>
        <FcGoogle/>
        Continue with Google
    </Button>

  )
}
