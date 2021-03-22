import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';
import MetaDescriptionAcumulado from '../LN/acumulado/metaDescriptionAcumulado';

const extractDataFromTags = payload => {
    const tagId =
        payload && payload.items && payload.items.length
            ? payload.items[0].slug
            : undefined;

    const tagName =
        payload && payload.items && payload.items.length
            ? payload.items[0].description
            : undefined;

    return {
        tagId,
        tagName
    };
};

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
    payload
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;
    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];
    if (acusWithMeta.includes(nodeType) && _id !== '/recetas') {
        const { tagId } = extractDataFromTags(payload);
        return (
            <MetaDescriptionAcumulado
                size="2"
                title={name}
                sectionId={nodeType === 'section' ? _id : null}
                authorId={nodeType === 'author' ? _id : null}
                distributorId={nodeType === 'distributor' ? name : null}
                tagId={nodeType === 'tags' ? tagId : null}
            />
        );
    }

    if (!subtype) return <></>;

    return (
        subtype && (
            <meta
                name="description"
                content={`${getMetaDescription(
                    description,
                    firstParagraphContentElements,
                    metaTitleBasic,
                    subheadlines
                )} - LA NACION`}
            />
        )
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
