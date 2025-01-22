import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Basket from '../assets/basket.svg';
import Sun from '../assets/sun.svg';
import { CountCart } from '../App';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const countCartContext = useContext(CountCart);

    if (!countCartContext) {
        throw new Error('CountCart context is not provided.');
    }

    const { count } = countCartContext;

    const handleHomePage = () => {
        navigate('/');
    };

    const handleNavigateToCart = () => {
        navigate('/cart');
    };

    return (
        <header className="flex flex-col select-none">
            <div className="bg-[#414558] py-2 text-neutral-content">
                <div className="flex justify-end gap-7 mx-auto w-full max-w-[1100px] text-[#e9e9e7]">
                    <NavLink to="/login" className="text-xs sm:text-sm hover:underline link link-hover">
                        Sign in / Guest
                    </NavLink>
                    <NavLink to="/register" className="text-xs sm:text-sm hover:underline link link-hover">
                        Create Account
                    </NavLink>
                </div>
            </div>
            <div className="bg-[#181920]">
                <div className="flex justify-between items-center mx-auto py-3 w-full max-w-[1100px]">
                    <button
                        className="lg:flex items-center hidden bg-[#FF7AC6] px-4 py-[5px] rounded-lg font-medium text-3xl select-none active btn btn-primary notActive"
                        onClick={handleHomePage}
                    >
                        C
                    </button>
                    <ul className="flex items-center text-[#F8F8F2]">
                        <NavLink to="/" className="hover:bg-[#2F2F35] px-4 py-2 rounded-lg text-[15px] transition-[0.5s]">
                            Home
                        </NavLink>
                        <NavLink to="/about" className="hover:bg-[#2F2F35] px-4 py-2 rounded-lg text-[15px] transition-[0.5s]">
                            About
                        </NavLink>
                        <NavLink to="/products" className="hover:bg-[#2F2F35] px-4 py-2 rounded-lg text-[15px] transition-[0.5s]">
                            Products
                        </NavLink>
                        <NavLink to="/cart" className="hover:bg-[#2F2F35] px-4 py-2 rounded-lg text-[15px] transition-[0.5s]">
                            Cart
                        </NavLink>
                    </ul>
                    <div className="flex items-center gap-[15px]">
                        <img className="w-[18px] cursor-pointer hover:rotate-[360deg]" src={Sun} alt="Theme Toggle" />
                        <div
                            onClick={handleNavigateToCart}
                            className="relative hover:bg-[#45464A] p-[8px] rounded-full transition-[0.5s] cursor-pointer active:scale-95"
                        >
                            <img src={Basket} className="w-[30px] cursor-pointer" alt="Basket" />
                            <span className="top-[3px] right-[-3px] absolute bg-[#FF7AC6] px-[8px] rounded-2xl text-[#2F2F35] text-[10px]">
                                {count}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;