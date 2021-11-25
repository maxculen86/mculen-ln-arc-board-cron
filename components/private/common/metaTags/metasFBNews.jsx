import React from 'react';
import PropTypes from 'prop-types';

const MetasFBNews = ({ nodeType, sections }) => {
    if (nodeType !== 'nota' || !sections.length) return <></>;

    const isOpinion = sections.find(x => x._id === '/opinion') !== undefined;

    return <meta property="article:opinion" content={`${isOpinion}`} />;
};

MetasFBNews.propTypes = {
    nodeType: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(Object).isRequired
};

export default MetasFBNews;
