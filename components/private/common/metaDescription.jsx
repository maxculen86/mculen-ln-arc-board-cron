import React from 'react';
import PropTypes from 'fusion:prop-types';
import getMetaDescription from './utils/getMetaDescription';
// import MetaDescriptionAcumulado from '../LN/acumulado/metaDescriptionAcumulado';

// const extractDataFromTags = payload => {
//     const tagId =
//         payload && payload.items && payload.items.length
//             ? payload.items[0].slug
//             : undefined;

//     const tagName =
//         payload && payload.items && payload.items.length
//             ? payload.items[0].description
//             : undefined;

//     return {
//         tagId,
//         tagName
//     };
// };

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
        // const { tagId } = extractDataFromTags(payload);

        return (
            <meta
                name="description"
                content={
                    _id === '/recetas' || acuRecetaRegExp.test(_id)
                        ? metaDescription
                        : `${metaDescription} - LA NACION`
                }
            />
        );
        // return (
        //     <MetaDescriptionAcumulado
        //         size="2"
        //         title={name}
        //         sectionId={nodeType === 'section' ? _id : null}
        //         authorId={nodeType === 'author' ? _id : null}
        //         distributorId={nodeType === 'distributor' ? name : null}
        //         tagId={nodeType === 'tags' ? tagId : null}
        //     />
        // );
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
