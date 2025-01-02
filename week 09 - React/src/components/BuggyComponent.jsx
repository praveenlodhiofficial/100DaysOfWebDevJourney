import React from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const BuggyButton = () => {
    const handleClick = () => {
        alert("Learn More button crashed!");
        throw new Error("Learn More button crashed!");
    };

    return (
        <button
            onClick={handleClick}
            className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg shadow hover:bg-blue-100 transition"
        >
            Learn More
        </button>
    );
};


const BuggyComponent = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
            <div className="bg-white shadow-md rounded-lg max-w-4xl flex flex-col lg:flex-row items-center">
                {/* Product Image */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src="https://i.ibb.co/qYf0HtS/zenitsu-agatsuma-5120x2880-19143.jpg"
                        alt="Product"
                        className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none w-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2 w-full p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Amazing Product</h1>
                    <p className="text-gray-600 mb-6">
                        Experience the next level of innovation with our amazing product. Designed for
                        efficiency and style, it's perfect for enhancing your daily life.
                    </p>
                    <div className="mb-6">
                        <span className="text-xl font-semibold text-green-600">$199</span>
                        <span className="text-gray-500 ml-2 line-through">$249</span>
                    </div>
                    <div className="flex space-x-4">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                            Buy Now
                        </button>
                        <ErrorBoundary>
                            <BuggyButton />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuggyComponent;
