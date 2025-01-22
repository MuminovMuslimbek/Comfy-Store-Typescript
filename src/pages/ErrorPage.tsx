import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleFromErrorPageToHome = () => {
        navigate('/');
    };

    return (
        <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
            <h1 className='font-medium text-[#FF7AC6] text-[150px]'>404</h1>
            <h4 className='mt-[-30px] font-bold text-[#F8F8F2] text-[50px]'>page not found</h4>
            <p className='mt-[10px] font-medium text-[#cdcdcd] text-[20px]'>
                Sorry, we couldn't find the page you're looking for.
            </p>
            <button
                onClick={handleFromErrorPageToHome}
                className='bg-[#BF95F9] mt-[50px] px-4 py-3 rounded-lg font-medium text-[#272935] text-[17px] uppercase transition-[0.3s] active:scale-95'
            >
                go back home
            </button>
        </div>
    );
};

export default ErrorPage;
