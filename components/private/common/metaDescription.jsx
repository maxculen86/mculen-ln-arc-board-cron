import React from 'react';
import PropTypes from 'fusion:prop-types';

const getMeta = (
    description,
    firstParagraphContentElements,
    metaTitleBasic
) => {
    if (description && description !== '') return description;
    if (firstParagraphContentElements && firstParagraphContentElements !== '')
        return firstParagraphContentElements;
    return metaTitleBasic;
};

const MetaDescription = ({
    subtype,
    description,
    firstParagraphContentElements,
    metaTitleBasic,
    arcSite
}) => {
    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;

    return (
        subtype === '1' && (
            <meta
                name="description"
                content={`${getMeta(
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
