import React from 'react';
import PropTypes from 'prop-types';

const MetasFBNews = ({ nodeType, sections, contentCode }) => {
    if (nodeType !== 'nota' || !sections.length) return <></>;

    const isOpinion = sections.find(x => x._id === '/opinion') !== undefined;
    const contentTiers = {
        abierta: 'free',
        cerrada: 'locked',
        comun: 'metered'
    };

    const nodes = [
        <meta property="article:opinion" content={`${isOpinion}`} />,
        <meta
            property="article:content_tier"
            content={`${contentTiers[contentCode]}`}
        />
    ];
    return nodes;
};

MetasFBNews.propTypes = {
    contentCode: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(Object).isRequired
};

export default MetasFBNews;
