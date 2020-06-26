import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';

const MetaDescription = ({
    subtype,
    description,
    firstParagraphContentElements,
    metaTitleBasic,
    arcSite
}) => {
    if (arcSite !== 'la-nacion-ar' || !subtype) return <></>;

    return (
        subtype &&
        subtype !== '7' && (
            <meta
                name="description"
                content={`${getMetaDescription(
                    description,
                    firstParagraphContentElements,
                    metaTitleBasic
                )} - LA NACION`}
            />
        )
    );
};

MetaDescription.propTypes = {
    subtype: PropTypes.string,
    description: PropTypes.string,
    firstParagraphContentElements: PropTypes.string,
    metaTitleBasic: PropTypes.string.isRequired
};

export default MetaDescription;
