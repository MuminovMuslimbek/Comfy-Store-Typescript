import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !password) {
            alert('Please fill out all fields.');
            return;
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className='flex flex-col justify-center items-center gap-6 shadow-md hover:shadow-2xl w-full h-[100vh] transition'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 gap-y-4 bg-base-100 shadow-lg p-8 rounded-2xl w-96 max-w-[400px] text-[#F8F8F2] card'>
                <h1 className='flex justify-center font-bold text-[#F8F8F2] text-[30px]'>Login</h1>
                <label htmlFor="email" className='flex flex-col gap-[7px] text-[14px]'>
                    Email
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className='border-[#4d4d4d] focus:border-[2px] bg-transparent p-3 border rounded-lg outline-none'
                    />
                </label>
                <label htmlFor="password" className='flex flex-col gap-[7px] mt-[10px] mb-[15px] text-[14px]'>
                    Password
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='border-[#4d4d4d] focus:border-[2px] bg-transparent p-3 border rounded-lg outline-none'
                    />
                </label>
                <button className='bg-[#FF7AC6] hover:bg-[#FF57B6] py-[13px] rounded-lg font-medium text-[#272935] text-[16px] uppercase transition-[0.3s] active:scale-95' type='submit'>Login</button>
                <button className='bg-[#BF95F9] hover:bg-[#bf95f9d9] py-[13px] rounded-lg font-medium text-[#272935] text-[16px] uppercase transition-[0.3s] active:scale-95' type='button' onClick={() => { }}>
                    Guest user
                </button>
                <p className='flex justify-center gap-3'>
                    Not a member yet?
                    <button onClick={navigateToRegister} className='hover:opacity-95 text-[#FF7AC6] hover:underline'>Register</button>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
