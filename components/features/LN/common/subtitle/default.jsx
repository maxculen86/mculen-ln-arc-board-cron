import React from 'react';

function Subtitle({ content }) {
    if (!content) return null;

    return (
        <h2 className="font-secondary text-base-light font-w-bold text-18 text-center leading-[140%] tracking-[-0.6px]">
            {content}
        </h2>
    );
}
export default Subtitle;
