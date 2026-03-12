import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import Context from 'fusion:context';
import Static from 'fusion:static';
import { Text } from '@ln/contenidos-ui-text';
import ComPartner from '../../private/common/com-partner';
import ComLink from '../../private/common/com-link';
import formatDistributorName from '../../private/LN/common/utils/formatDistributorName';
import {
    HTMLLIBRE,
    RECETA
} from '../../private/common/utils/subtypes/subtypeHelper';

function FirmaLogoExterno({ globalContent }) {
    const {
        distributor = { name: 'LA NACION' },
        subtype,
        credits,
        withFirmaDistributor
    } = globalContent || {};
    const { name, mode } = distributor;
    const { by = [] } = credits || {};

    if (name && name === 'lanacionar') return null;

    const getContent = () => {
        const isReceta = subtype === RECETA;
        const isHtmlLibre = subtype === HTMLLIBRE;
        const isLaNacion = name === 'LA NACION';
        const isCustomDistributor = mode === 'custom';
        const hasAuthor = by.length > 0;

        if ((isReceta || isLaNacion) && hasAuthor) {
            return null;
        }

        if (isHtmlLibre) {
            return <ComPartner size="--xs">{name}</ComPartner>;
        }

        if (isReceta && !hasAuthor) {
            return <ComPartner size="--xs">Por LA NACION recetas</ComPartner>;
        }

        if (!withFirmaDistributor) {
            if (isLaNacion || isCustomDistributor) {
                return (
                    <div className="mb-32">
                        <Text className="font-bold --twoxs">{name}</Text>
                    </div>
                );
            }
            return (
                <ComLink
                    link={`${SITE_LANACION}/distributor/${formatDistributorName(name)}/`}
                >
                    <ComPartner size="--twoxs mb-32">{name}</ComPartner>
                </ComLink>
            );
        }

        return null;
    };

    const content = getContent();

    if (!content) return null;

    return (
        <Static id="LN-firma-logo-externo" htmlOnly>
            {content}
        </Static>
    );
}

FirmaLogoExterno.label = 'LN-Nota-FirmaLogoExterno';

export default Context(FirmaLogoExterno);
