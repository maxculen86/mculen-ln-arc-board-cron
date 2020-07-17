import React from 'react';
import PropTypes from 'fusion:prop-types';

const MetaTitle = ({ subtype, metaTitleBasic, arcSite }) => {
    if (arcSite !== 'la-nacion-ar' || !subtype) return <></>;

    return (
        subtype &&
        metaTitleBasic && (
            <meta name="title" content={`${metaTitleBasic} - LA NACION`} />
        )
    );
};

MetaTitle.propTypes = {
    subtype: PropTypes.string,
    metaTitleBasic: PropTypes.string.isRequired
};

export default MetaTitle;
