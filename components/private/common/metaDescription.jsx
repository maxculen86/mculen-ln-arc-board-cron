import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';

const MetaDescription = ({
    subtype,
    description,
    metaTitleBasic,
    arcSite,
    nodeType,
    subheadlines,
    _id,
    section,
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
                metaDescription
            }
        />
    );
};

MetaDescription.propTypes = {
    metaDescription: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    metaTitleBasic: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    subheadlines: PropTypes.object
};

export default MetaDescription;
