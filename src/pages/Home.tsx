import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Hero from '../assets/hero.webp';
import Hero2 from '../assets/hero2.webp';
import Hero3 from '../assets/hero3.webp';
import Hero4 from '../assets/hero4.webp';
import { useNavigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

interface Product {
    id: number;
    attributes: {
        title: string;
        price: number;
        image: string;
    };
}

const Home: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://strapi-store-server.onrender.com/api/products?featured=true')
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleProductPage = () => {
        navigate('/products');
    };

    const handleRedirect = (id: number) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className='mx-auto py-20 w-full max-w-[1100px]'>
            {loading ? (
                <div className='flex justify-center items-center pt-[200px] w-full h-full max-h-[500px]'>
                    <Puff
                        visible={true}
                        height="80"
                        width="80"
                        color="#fff"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                    />
                </div>
            ) : (
                <div>
                    <div className='flex justify-between items-center pb-24'>
                        <div className='flex flex-col items-start max-w-[600px]'>
                            <h1 className='max-w-[500px] font-bold text-[#F8F8F2] text-4xl sm:text-6xl tracking-tight'>
                                We are changing the way people shop
                            </h1>
                            <p className='mt-8 max-w-[450px] text-[#F8F8F2] text-lg leading-8'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
                            </p>
                            <button
                                onClick={handleProductPage}
                                className='bg-[#FF7AC6] mt-[40px] px-4 py-3 rounded-lg font-medium text-[#272935] uppercase transition-[0.3s] active:scale-95'
                            >
                                our products
                            </button>
                        </div>
                        <div className="space-x-4 hidden bg-neutral p-4 rounded-box max-w-[460px] h-[28rem] carousel-center lg:carousel">
                            <img className="rounded-2xl w-full max-w-[350px] h-full" src={Hero} alt="Hero" />
                            <img className="rounded-2xl w-full max-w-[350px] h-full" src={Hero2} alt="Hero2" />
                            <img className="rounded-2xl w-full max-w-[350px] h-full" src={Hero3} alt="Hero3" />
                            <img className="rounded-2xl w-full max-w-[350px] h-full" src={Hero4} alt="Hero4" />
                        </div>
                    </div>
                    <div className='pb-5 border-b border-base-300 text-[#F8F8F2] capitalize'>
                        <h2 className='font-medium text-3xl capitalize tracking-wider'>featured products</h2>
                    </div>
                    <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 pt-12'>
                        {data &&
                            data.map((product) => (
                                <div
                                    onClick={() => {
                                        handleRedirect(product.id);
                                    }}
                                    key={product.id}
                                    className='shadow-xl hover:shadow-2xl p-4 rounded-2xl w-full text-[#F8F8F2] transition duration-300 cursor-pointer select-none'
                                >
                                    <img
                                        className='rounded-xl w-full h-64 md:h-48 object-cover'
                                        src={product.attributes.image}
                                        alt={product.attributes.title}
                                    />
                                    <div className='flex flex-col items-center gap-2 p-6 text-center card-body'>
                                        <h3 className='font-medium text-[20px] capitalize'>{product.attributes.title}</h3>
                                        <p className='text-[#846eaa]'>${product.attributes.price}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
