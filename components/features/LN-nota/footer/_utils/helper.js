import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import ComPartner from '../../../../private/common/com-partner';
import ComLink from '../../../../private/common/com-link';
import buildDistributorUrl from '../../../../private/LN/common/utils/buildDistributorUrl';

const getSignatureRenderOptions = ({
    isHtmlLibre,
    isReceta,
    hasAuthor,
    isLaNacion,
    isCustomDistributor,
    withFirmaDistributor,
    name,
    subcategory
}) => [
    {
        shouldRender: isHtmlLibre,
        signatureContent: <ComPartner size="--xs">{name}</ComPartner>
    },
    {
        shouldRender: isReceta && !hasAuthor,
        signatureContent: (
            <Text className="font-bold --xs">Por LA NACION recetas</Text>
        )
    },
    {
        shouldRender: !withFirmaDistributor,
        signatureContent:
            isLaNacion || isCustomDistributor ? (
                <Text className="font-bold --twoxs">{name}</Text>
            ) : (
                <div className="flex gap-4 ai-center">
                    <ComLink link={buildDistributorUrl(name)}>
                        <ComPartner size="--twoxs">{name}</ComPartner>
                    </ComLink>
                    {subcategory?.length > 0 && name === 'EL PAIS' && (
                        <Text className="text-12 text-neutral-light-800">
                            {subcategory}
                        </Text>
                    )}
                </div>
            )
    }
];

export function isInvalidLogo(logoData) {
    return (
        !logoData || !logoData.logoName || logoData.logoName === 'canchallena'
    );
}

export default getSignatureRenderOptions;
