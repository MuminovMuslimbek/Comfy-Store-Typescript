import React, { useState, useEffect, useContext } from 'react';
import { CountCart } from '../App';

interface CartItem {
    cartID: string;
    title: string;
    company: string;
    productColor: string;
    amount: number;
    price: number;
    image: string;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [notProduct, setNotProduct] = useState(false);

    const { setCount } = useContext(CountCart)!; // "!" belgisi kontekstda qiymat borligini ta'minlaydi

    const getItemFromLocalStorage = (): CartItem[] => {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    };

    const removeItemFromCart = (cartID: string) => {
        const YouSure = confirm('Are you sure you want to remove this item from the cart?');
        if (YouSure) {
            const updatedCart = cartItems.filter((item) => item.cartID !== cartID);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            if (updatedCart.length === 0) {
                setNotProduct(true);
            }
        }
    };

    useEffect(() => {
        const items = getItemFromLocalStorage();
        if (items.length === 0) {
            setNotProduct(true);
        } else {
            setCartItems(items);
            setNotProduct(false);
        }
    }, []);

    useEffect(() => {
        const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);
        setCount(totalAmount);
    }, [cartItems, setCount]);

    const calculateSubtotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.amount, 0);

    const calculateTax = (subtotal: number) => subtotal * 0.1;

    const calculateOrderTotal = (subtotal: number, shipping: number, tax: number) =>
        subtotal + shipping + tax;

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const orderTotal = calculateOrderTotal(subtotal, 5, tax);

    return (
        <div className="mx-auto py-[80px] w-full max-w-[1100px]">
            <div className="pb-5 border-b border-base-300 text-[#F8F8F2] capitalize">
                <h2 className="font-medium text-[30px] text-3xl capitalize tracking-wider">
                    {notProduct ? 'Your cart is empty' : 'Your cart'}
                </h2>
            </div>
            {cartItems.length > 0 && (
                <div className="gap-8 grid lg:grid-cols-12 mt-8">
                    <div className="lg:col-span-8">
                        {cartItems.map((item) => (
                            <article
                                key={item.cartID}
                                className="flex sm:flex-row flex-col flex-wrap gap-y-4 mb-12 pb-6 border-b border-base-300 last:border-b-0"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-lg w-24 sm:w-32 h-24 sm:h-32 object-cover"
                                />
                                <div className="sm:ml-16 sm:w-48">
                                    <h3 className="font-medium capitalize">{item.title}</h3>
                                    <h4 className="mt-2 text-neutral-content text-sm capitalize">{item.company}</h4>
                                    <p className="flex items-center gap-x-2 mt-4 text-sm capitalize">
                                        color:{' '}
                                        <span
                                            className="badge badge-sm"
                                            style={{ backgroundColor: item.productColor }}
                                        ></span>
                                    </p>
                                </div>
                                <div className="sm:ml-12">
                                    <div className="flex flex-col items-center gap-1 max-w-xs">
                                        <label htmlFor="amount" className="p-0 label">
                                            <span className="label-text">Amount</span>
                                        </label>
                                        <p>{item.amount}</p>
                                    </div>
                                    <button
                                        className="mt-2 text-sm link link-hover link-primary"
                                        onClick={() => removeItemFromCart(item.cartID)}
                                    >
                                        remove
                                    </button>
                                </div>
                                <p className="sm:ml-auto font-medium">${item.price}</p>
                            </article>
                        ))}
                    </div>

                    <div className="lg:col-span-4 lg:pl-4">
                        <div className="bg-base-200 card">
                            <div className="card-body">
                                <p className="flex justify-between pb-2 border-b border-base-300 text-xs">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between pb-2 border-b border-base-300 text-xs">
                                    <span>Shipping</span>
                                    <span className="font-medium">$5.00</span>
                                </p>
                                <p className="flex justify-between pb-2 border-b border-base-300 text-xs">
                                    <span>Tax</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between mt-4 pb-2 text-sm">
                                    <span>Order Total</span>
                                    <span className="font-medium">${orderTotal.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                        <a className="btn-block mt-8 uppercase btn btn-secondary" href="/login">
                            please login
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
