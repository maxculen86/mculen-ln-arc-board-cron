import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';
import { isInPVS } from './utils/getMetaDescriptionForAcum';

const MetaDescription = ({
    subtype,
    description,
    metaTitleBasic,
    arcSite,
    nodeType,
    subheadlines,
    _id,
    section,
    metaDescription,
    ottMetaDescription
}) => {
    if (
        !subtype &&
        section !== 'home' &&
        !['la-nacion-ar', 'ott'].includes(arcSite)
    )
        return <></>;

    const setContent = () => {
        if (arcSite === 'ott') return ottMetaDescription;

        return (
            (subtype &&
                `${getMetaDescription(
                    description,
                    metaTitleBasic,
                    subheadlines,
                    subtype
                )}`) ||
            metaDescription
        );
    };

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];
    const acuRecetaRegExp = new RegExp(/^\/recetas\/(.+)$/);

    if (acusWithMeta.includes(nodeType) && arcSite === 'la-nacion-ar') {
        return (
            <meta
                name="description"
                content={
                    _id === '/recetas' ||
                    acuRecetaRegExp.test(_id) ||
                    isInPVS(_id)
                        ? metaDescription
                        : `${metaDescription} - LA NACION`
                }
            />
        );
    }

    const content = setContent();

    return <meta name="description" content={content} />;
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
    subheadlines: PropTypes.object,
    ottMetaDescription: PropTypes.string
};

export default MetaDescription;
