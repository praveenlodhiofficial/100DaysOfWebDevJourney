import React from 'react';

const ProductsProps = () => {
    return (
        <main>
            <Product
                name='Refrigerator'
                img='https://imgs.search.brave.com/mCDroW_TaEzmQmytTfXcEJJdKFXocGwdV0yzVxkf7v0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3Lzk5LzIyLzkw/LzM2MF9GXzc5OTIy/OTA1MV8xWVBTd3c0/TXBscXZYd3liMUIx/ZkwxZWFudUtnZVAx/aC5qcGc'
                description='A high-efficiency refrigerator with ample storage space.'
                price={499.99}
                isAvailable={true}
            />
            <Product
                name='Washing Machine'
                img='https://imgs.search.brave.com/bnb5p0WGCL9fPYTHRuMEBxmyFRNDzgailLNEwtEDVoM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzY3Lzg5LzQ2/LzM2MF9GXzk2Nzg5/NDYwN19EeHYxaENT/bHhScnNrMzhqUm9a/ZjRiRWFZMXo4MTVz/US5qcGc'
                description='A front-loading washing machine with energy-saving features.'
                price={299.99}
                isAvailable={false}
            />
            <Product
                name='Microwave Oven'
                img='https://imgs.search.brave.com/m_QbLCM_Af7-9csXLfklbWSWID9oQG8NdaPlSohSJ9o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzYyLzQ4LzQz/LzM2MF9GXzYyNDg0/MzY1X2tkRlJWT0hn/TXBZQndCWW1mMk1U/VVhnTEJCMVoyMkdk/LmpwZw'
                description='A compact microwave oven with multiple cooking settings.'
                price={89.99}
                isAvailable={true}
            />
        </main>
    );
};

const Product = ({ img, name, price, description, isAvailable }) => {
    return (
        <article className='flex p-4 mb-2 border border-dotted border-gray-700 rounded shadow-md justify-center'>
            <img 
                src={img} 
                alt={name} 
                width={150} 
                height={150} 
                className='object-cover rounded' 
            />
            <div className='ml-4 flex flex-col justify-center max-w-72'>
                <h2 className='text-lg font-semibold'>{name}</h2>
                <p className='text-gray-500'>Price: ${price.toFixed(2)}</p>
                <p className='text-gray-500 py-5 w-[70%]'>{description}</p>
                <p className={`${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {isAvailable ? 'In Stock' : 'Out of Stock'}
                </p>
            </div>
        </article>
    );
};

export default ProductsProps;
