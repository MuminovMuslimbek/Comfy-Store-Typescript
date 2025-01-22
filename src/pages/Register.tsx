import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match!')
            return;
        }

        if (!formData.email.includes('@')) {
            console.log('Please enter a valid email address!')
            return;
        }

        setError(null);

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        navigate('/login'); 
    };

    return (
        <div className="flex justify-center items-center bg-gray-900 min-h-screen text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 shadow-md p-8 rounded-lg w-full max-w-md"
            >
                <h2 className="mb-6 font-bold text-2xl text-center">Register</h2>
                {error && (
                    <div className="bg-red-500 mb-4 p-2 rounded text-white">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded w-full font-semibold text-white"
                >
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-400 hover:underline"
                    >
                        Login here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;
