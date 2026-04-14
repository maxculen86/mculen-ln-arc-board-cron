import React from 'react';

function Title({ content }) {
    if (!content) return null;

    return (
        <h1 className="font-primary-italic text-32 md:text-40 xl:text-48 text-center leading-[110%] tracking-[-1.6px] [--vf-wght:140] [--vf-opsz:50]">
            {content}
        </h1>
    );
}
export default Title;
