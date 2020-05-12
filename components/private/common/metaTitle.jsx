import React from 'react';
import PropTypes from 'fusion:prop-types';

const MetaTitle = ({ subtype, metaTitleBasic, arcSite }) => {
    console.log('MetaTitle -> metaTitleBasic', metaTitleBasic);
    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;

    return (
        subtype === '1' &&
        metaTitleBasic && <meta name="title" content={metaTitleBasic} />
    );
};

MetaTitle.propTypes = {
    subtype: PropTypes.string,
    metaTitleBasic: PropTypes.string.isRequired
};

export default MetaTitle;
