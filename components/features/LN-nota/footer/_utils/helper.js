import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { Text } from '@ln/contenidos-ui-text';
import ComPartner from '../../../../private/common/com-partner';
import ComLink from '../../../../private/common/com-link';
import formatDistributorName from '../../../../private/LN/common/utils/formatDistributorName';

const getSignatureRenderOptions = ({
    isHtmlLibre,
    isReceta,
    hasAuthor,
    isLaNacion,
    isCustomDistributor,
    withFirmaDistributor,
    name
}) => [
    {
        shouldRender: isHtmlLibre,
        signatureContent: <ComPartner size="--xs">{name}</ComPartner>
    },
    {
        shouldRender: isReceta && !hasAuthor,
        signatureContent: (
            <ComPartner size="--xs">Por LA NACION recetas</ComPartner>
        )
    },
    {
        shouldRender: !withFirmaDistributor,
        signatureContent:
            isLaNacion || isCustomDistributor ? (
                <div className="mb-32">
                    <Text className="font-bold --twoxs">{name}</Text>
                </div>
            ) : (
                <ComLink
                    link={`${SITE_LANACION}/distributor/${formatDistributorName(name)}/`}
                >
                    <ComPartner size="--twoxs">{name}</ComPartner>
                </ComLink>
            )
    }
];

export const getSectionsAsTags = (sections = []) => {
    if (!sections || sections.length === 0) return [];

    const mainSection = sections[0];
    const mainSectionParentIds =
        mainSection?.parent_id?.split('/').filter(id => id !== '') || [];

    return sections
        .filter(
            ({ name, path }) =>
                name &&
                name !== mainSection?.name &&
                path !== mainSection?.parent_id &&
                !mainSectionParentIds.includes(path?.replace('/', ''))
        )
        .map(({ type, path, name }) => ({
            type,
            slug: path,
            text: name
        }));
};

export default getSignatureRenderOptions;
