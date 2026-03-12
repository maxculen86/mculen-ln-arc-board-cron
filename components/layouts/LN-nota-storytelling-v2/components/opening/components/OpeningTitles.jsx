import React from 'react';

function OpeningTitles({ title1 = '', title2 = '' }) {
    if (!title1 && !title2) return null;

    return (
        <>
            {title1 && <h1 className="">{title1}</h1>}
            {title2 && <h2 className="">{title2}</h2>}
        </>
    );
}

export default OpeningTitles;
