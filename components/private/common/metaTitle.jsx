import React from 'react';
import PropTypes from 'fusion:prop-types';

const MetaTitle = ({ subtype, basicTitle, metaTitle, arcSite }) => {
    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;

    const metaTitleBasic =
        metaTitle && metaTitle !== '' ? metaTitle : basicTitle;

    return (
        subtype === '1' &&
        metaTitleBasic && <meta name="title" content={metaTitleBasic} />
    );
};

MetaTitle.propTypes = {
    subtype: PropTypes.string,
    canonicalUrl: PropTypes.string.isRequired
};

export default MetaTitle;
