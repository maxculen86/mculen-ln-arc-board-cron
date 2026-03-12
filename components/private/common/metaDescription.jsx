import React from 'react';
import getMetaDescription from './utils/getMetaDescription';
import { isInPVS } from './utils/getMetaDescriptionForAcum';

function MetaDescription({
    subtype,
    description,
    metaTitleBasic,
    arcSite,
    nodeType,
    subheadlines,
    _id,
    section,
    metaDescription,
    displayDate
}) {
    if (!subtype && section !== 'home' && !['la-nacion-ar'].includes(arcSite))
        return null;

    const setContent = () =>
        (subtype &&
            `${getMetaDescription(
                description,
                metaTitleBasic,
                subheadlines,
                subtype,
                displayDate
            )}`) ||
        metaDescription;

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];
    const acuRecetaRegExp = /^\/recetas\/(.+)$/;

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
}

export default MetaDescription;
