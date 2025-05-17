import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LikeCount = ({ interviewid }) => {
    const [like, setLiker] = useState(0);
    const user = useSelector(state => state.user);
    const { data: likeCounter, loading, error, refetch } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/interview-like/get-like/${interviewid}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );
    useEffect(() => {
        if (likeCounter) {
            setLiker(likeCounter.likeCount || 0);
        }
    }, [likeCounter]);
    const handleLike = async () => {
        try {
            if (!user.isLoggedIn) {
                return showToast('error', 'Please login');
            }
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/interview-like/like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': "application/json" },
                body: JSON.stringify({ userid: user.user._id, interviewid }) 
            });
            const data = await response.json();
            if (!response.ok) {
                showToast('error', response.statusText);
            } else {
                setLiker(data.likeCount || 0);
                if (typeof refetch === "function") refetch();
            }
        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
        <button onClick={handleLike} type="button" className='flex justify-between items-center gap-1'>
            <FaHeart className='w-4 h-4' />
            {like}
        </button>
    );
};

export default LikeCount;

