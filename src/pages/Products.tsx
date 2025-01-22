import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import burgerBold from '../assets/img.svg';
import burger from '../assets/burger.svg';

interface Product {
    id: number;
    attributes: {
        title: string;
        price: number;
        image: string;
    };
}

interface FilterMeta {
    pagination: {
        total: number;
    };
    categories?: string[];
    companies?: string[];
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(1000);
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('all');
    const [company, setCompany] = useState<string>('all');
    const [order, setOrder] = useState<string>('a-z');
    const [filterProduct, setFilterProduct] = useState<FilterMeta | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://strapi-store-server.onrender.com/api/products?page=${currentPage - 1}`)
            .then(response => {
                if (response.status === 200 && response.data) {
                    setProducts(response.data.data);
                    setFilterProduct(response.data.meta);
                    setTotalPages(Math.ceil(response.data.meta.pagination.total / 10));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [currentPage]);

    const handleRedirect = (id: number) => {
        navigate(`/products/${id}`);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        axios.get(`https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&page=${currentPage - 1}`)
            .then(response => {
                if (response.status === 200 && response.data) {
                    setProducts(response.data.data);
                    setFilterProduct(response.data.meta);
                    setTotalPages(Math.ceil(response.data.meta.pagination.total / 10));
                }
            })
            .catch(err => {
                console.error(err);
                navigate('/products');
            })
            .finally(() => setLoading(false));
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <form className='flex flex-col gap-[30px] bg-[#181920] mx-auto my-[50px] p-[30px] rounded-lg w-full max-w-[1100px]'>
                <div className="flex justify-between gap-[20px]">
                    <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="product">
                        Search Product
                        <input id="product" value={search} onChange={(e) => setSearch(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] focus:outline-none" type="text" />
                    </label>

                    <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="category">
                        Select Category
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
                            {filterProduct && filterProduct.categories && filterProduct.categories.length > 0 ? (
                                filterProduct.categories.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))
                            ) : (
                                <option value="all">No categories available</option>
                            )}
                        </select>
                    </label>

                    <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="company">
                        Select Company
                        <select value={company} onChange={(e) => setCompany(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
                            {filterProduct && filterProduct.companies && filterProduct.companies.length > 0 ? (
                                filterProduct.companies.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))
                            ) : (
                                <option value="all">No companies available</option>
                            )}
                        </select>
                    </label>

                    <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="sort">
                        Sort By
                        <select value={order} onChange={(e) => setOrder(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                            <option value="high">high</option>
                            <option value="low">low</option>
                        </select>
                    </label>
                </div>

                <div className='flex justify-between items-center gap-[20px]'>
                    <div className="flex flex-col gap-3 w-full max-w-[240px] font-medium text-[#f8f8f8]">
                        <label htmlFor="price" className="flex justify-between items-center">
                            <span>Select Price</span>
                            <span>${price.toFixed(2)}</span>
                        </label>
                        <input id="price" type="range" min="0" max="1000" step="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="range range-secondary range-sm" />
                        <div className="flex justify-between text-sm">
                            <span>0</span>
                            <span>Max: $1,000.00</span>
                        </div>
                    </div>

                    <div className="w-full max-w-[230px]">
                        <label htmlFor="checkbox" className="flex flex-col items-center gap-[7px] w-full text-[#f8f8f8] text-[16px]">
                            Free shipping
                            <input id="checkbox" type="checkbox" className="checkbox checkbox-secondary checkbox-sm" />
                        </label>
                    </div>

                    <button onClick={handleSearch} className="bg-[#f06292] hover:opacity-80 px-6 py-[6px] rounded-lg w-full max-w-[230px] font-semibold text-[#1b1c21] transition active:scale-95">
                        SEARCH
                    </button>

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setLoading(true);
                            axios.get(`https://strapi-store-server.onrender.com/api/products`)
                                .then((response) => {
                                    if (response.status === 200 && response.data) {
                                        setProducts(response.data.data);
                                        setFilterProduct(response.data.meta);
                                        setPrice(1000);
                                        setSearch('');
                                        setCategory('all');
                                        setCompany('all');
                                        setOrder('a-z');
                                    }
                                })
                                .catch((err) => console.error(err))
                                .finally(() => setLoading(false));
                        }}
                        className="bg-[#ffa726] hover:opacity-80 px-6 py-[6px] rounded-lg w-full max-w-[230px] font-semibold text-[#1b1c21] transition active:scale-95">
                        RESET
                    </button>
                </div>
            </form>

            <div className='mx-auto w-full max-w-[1100px]'>
                <div className='flex justify-between pb-5 border-b border-base-300 text-[#F8F8F2]'>
                    <h2 className='font-medium text-[17px] text-3xl tracking-wider'>{filterProduct?.pagination?.total} products</h2>
                    <div className="flex gap-x-2">
                        <button type="button" className="bg-[#FF7AC6] hover:bg-[#FF7AC6] text-primary-content text-xl btn btn-circle btn-sm">
                            <img src={burgerBold} alt="Burger Bold" />
                        </button>
                        <button type="button" className="text-based-content text-xl btn btn-circle btn-ghost btn-sm">
                            <img src={burger} className='text-white' alt="Burger" />
                        </button>
                    </div>
                </div>
            </div>

            {loading && (
                <div className='flex justify-center items-center pt-[250px] w-full'>
                    <Puff color="#f06292" height={100} width={100} />
                </div>
            )}

            {!loading && (
                <div className='gap-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-auto my-[30px] w-full max-w-[1100px]'>
                    {products.map((product) => (
                        <div key={product.id} className='flex flex-col items-center bg-[#181920] shadow-lg p-[20px] rounded-xl cursor-pointer' onClick={() => handleRedirect(product.id)}>
                            <img className='rounded-xl w-[250px] h-[250px] object-cover' src={product.attributes.image} alt={product.attributes.title} />
                            <h2 className='mt-4 font-semibold text-[#f8f8f8] text-[17px]'>{product.attributes.title}</h2>
                            <span className='font-medium text-[#f06292] text-[14px]'>${product.attributes.price}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end gap-5 mr-20 pb-10">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className="btn btn-secondary">Previous</button>
                <span className="text-[#f8f8f8] text-lg">Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="btn btn-secondary">Next</button>
            </div>
        </>
    );
};

export default Products;