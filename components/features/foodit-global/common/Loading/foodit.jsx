import React from 'react';
const LoadingFoodit = () => {
    return (
        <>
            <div className="text-center">
                <span
                    role="status"
                    className="foodit-spinner inline-block w-16 ratio-1-1 rounded-circle border border-all border-thin"
                    data-variant="secondary"
                ></span>
            </div>
        </>
    );
};

export default LoadingFoodit;
