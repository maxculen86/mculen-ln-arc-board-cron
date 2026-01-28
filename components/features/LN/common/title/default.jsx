import React from 'react';

function Title({ content }) {
    if (!content) return null;

    return (
        <h1 className="font-primary-italic font-w-bold text-32 md:text-40 xl:text-48 text-center leading-[110%] tracking-[-1.6px]">
            {content}
        </h1>
    );
}
export default Title;
