import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';

const MetaDescription = ({
    subtype,
    description,
    firstParagraphContentElements,
    metaTitleBasic,
    arcSite,
    nodeType,
    name,
    subheadlines,
    _id,
    payload,
    section,
    defaultDescription,
    metaDescription
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];
    const acuRecetaRegExp = new RegExp(/^\/recetas\/(.+)$/);
    if (acusWithMeta.includes(nodeType)) {
        return (
            <meta
                name="description"
                content={
                    _id === '/recetas' ||
                    acuRecetaRegExp.test(_id) ||
                    _id.includes('/horoscopo')
                        ? metaDescription
                        : `${metaDescription} - LA NACION`
                }
            />
        );
    }

    if (!subtype && section !== 'home') return <></>;

    return (
        <meta
            name="description"
            content={
                (subtype &&
                    `${getMetaDescription(
                        description,
                        metaTitleBasic,
                        subheadlines,
                        subtype
                    )}`) ||
                defaultDescription
            }
        />
    );
};

MetaDescription.propTypes = {
    subtype: PropTypes.string,
    description: PropTypes.string,
    firstParagraphContentElements: PropTypes.string,
    metaTitleBasic: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subheadlines: PropTypes.object
};

export default MetaDescription;
