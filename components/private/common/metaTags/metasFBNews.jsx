import React from 'react';

function MetasFBNews({ nodeType, sections }) {
    if (nodeType !== 'nota' || !sections.length) return null;

    const isOpinion = sections.find(x => x._id === '/opinion') !== undefined;

    return <meta property="article:opinion" content={`${isOpinion}`} />;
}

export default MetasFBNews;
