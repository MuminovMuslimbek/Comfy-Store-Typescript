import axios from 'axios';
import React, { useContext, useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { CountCart } from '../App';

interface Product {
    id?: string;
    attributes?: {
        image?: string;
        title?: string;
        price?: number;
        company?: string;
        description?: string;
        colors?: string[];
    };
}

const ProductsDetails: React.FC = () => {
    const [product, setProduct] = useState<Product>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productColor, setProductColor] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);
    const { count, setCount } = useContext(CountCart);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setProduct(response.data.data);
                    if (
                        response.data.data.attributes?.colors &&
                        response.data.data.attributes.colors.length > 0
                    ) {
                        setProductColor(response.data.data.attributes.colors[0]);
                    }
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleToHomePage = (): void => {
        navigate('/');
    };

    const handleToProductsPage = (): void => {
        navigate('/products');
    };

    const handleAddToCart = (event: FormEvent): void => {
        event.preventDefault();
        if (!product.id || !product.attributes) return;

        const cartProduct = {
            cartID: `${product.id}${productColor}`,
            productID: product.id,
            image: product.attributes.image,
            title: product.attributes.title,
            price: product.attributes.price,
            company: product.attributes.company,
            productColor,
            amount,
        };

        const existingCart: typeof cartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
        existingCart.push(cartProduct);
        localStorage.setItem('cart', JSON.stringify(existingCart));
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center pt-[200px] w-full h-full max-h-[500px]">
                    <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" />
                </div>
            ) : (
                product.id && (
                    <div className="mx-auto py-24 w-full max-w-[1100px] h-full">
                        <div className="flex items-center gap-2 pb-[25px] text-[#F8F8F2]">
                            <button className="hover:underline" onClick={handleToHomePage}>
                                Home
                            </button>
                            <span className="font-medium text-[#bebebe]">{'>'}</span>
                            <button className="hover:underline" onClick={handleToProductsPage}>
                                Products
                            </button>
                        </div>
                        <div className="flex justify-between gap-14 text-[#F8F8F2]">
                            <img
                                src={product.attributes?.image}
                                className="rounded-lg lg:w-full max-w-[500px] h-96 object-cover"
                                alt={product.attributes?.title}
                            />
                            <div className="flex flex-col max-w-[500px]">
                                <h3 className="font-bold text-3xl capitalize">{product.attributes?.title}</h3>
                                <h4 className="mt-2 font-bold text-neutral-content text-xl">
                                    {product.attributes?.company}
                                </h4>
                                <p className="mt-3 text-xl">${product.attributes?.price}</p>
                                <p className="mt-6 leading-8">{product.attributes?.description}</p>
                                <h4 className="mt-6 font-medium text-md capitalize tracking-wider">Colors</h4>
                                <div className="mt-2">
                                    {product.attributes?.colors &&
                                        product.attributes.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`badge w-6 h-6 mr-2 ${color === productColor ? 'border-2 border-secondary' : ''
                                                    }`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setProductColor(color)}
                                            ></button>
                                        ))}
                                </div>
                                <div className="flex flex-col max-w-[300px]">
                                    <label
                                        htmlFor="amountSelect"
                                        className="mt-2 mb-2 font-semibold text-white"
                                    >
                                        Amount
                                    </label>
                                    <select
                                        id="amountSelect"
                                        name="amount"
                                        className="border-[#BF95F9] border-2 bg-gray-800 px-4 py-3 rounded-md focus:ring-1 focus:ring-[#BF95F9] text-[15px] text-white cursor-pointer focus:outline-none"
                                        onChange={(e) => setAmount(parseInt(e.target.value))}
                                    >
                                        {[...Array(20).keys()].map((i) => (
                                            <option key={i} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#BF95F9] hover:opacity-75 mt-[40px] px-2 py-3 rounded-lg max-w-[120px] font-medium text-[#272935] text-[15px] uppercase transition-[0.3s] active:scale-95"
                                >
                                    add to bag
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProductsDetails;
