import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { useAppContext } from 'fusion:context';
import ImageUI from '../../../../../features/ui/ln/image/default';
import LinkUI from '../../../../../features/ui/ln/link/default';
import get from '../../../../../private/common/utils/get';
import {
    dictionaryAlt,
    getSectionLogo
} from '../../../../../private/common/utils/sectionUtils';
import getTargetAndRelIfExternal from '../../../../../private/common/utils/getTargetAndRelIfExternal';
import { appendPageReferrerParam } from '../../../../../private/LN/common/utils/pageReferrer';

function OpeningAddons({ globalContent = {}, layout = '' }) {
    const { deployment, contextPath } = useAppContext();
    const sections = get(globalContent, 'taxonomy.sections', []);
    const distributorName = get(globalContent, 'distributor.name', 'LA NACION');
    const logoData = getSectionLogo(sections, layout, distributorName) || {};
    const {
        logoName = '',
        path = '',
        color = true,
        isExternal = false
    } = logoData;
    const sponsor = !color && logoName ? `${logoName}-blanco` : logoName;
    const logoAlt = dictionaryAlt[logoName] || logoName;

    const { target, rel } = getTargetAndRelIfExternal(isExternal);
    const decoratedPath = path ? appendPageReferrerParam(path) : '';

    const isSponsored = get(globalContent, 'owner.sponsored', false);
    const advertiser = get(globalContent, 'label.marca_anunciante.text', '')
        .toString()
        .trim();
    const showContentLab = isSponsored && Boolean(advertiser);

    const isSubscriberContent =
        get(globalContent, 'content_restrictions.content_code', '') ===
        'cerrada';

    const hasAddons = Boolean(sponsor) || showContentLab || isSubscriberContent;

    if (!hasAddons) return null;

    return (
        <div className="">
            {/* Brands */}
            {sponsor &&
                (decoratedPath ? (
                    <LinkUI
                        href={decoratedPath}
                        title={logoAlt}
                        target={target}
                        rel={rel}
                    >
                        <ImageUI
                            src={deployment(
                                `${contextPath}/resources/images/${sponsor}.svg`
                            )}
                            alt={logoAlt}
                            className=""
                        />
                    </LinkUI>
                ) : (
                    <ImageUI
                        src={deployment(
                            `${contextPath}/resources/images/${sponsor}.svg`
                        )}
                        alt={logoAlt}
                        className=""
                    />
                ))}

            {/* Content Lab */}
            {showContentLab && (
                <span className="">{`Content LAB para ${advertiser}`}</span>
            )}

            {/* Suscriptores */}
            {isSubscriberContent && (
                <Badge type="subscriber">Suscriptores</Badge>
            )}
        </div>
    );
}

export default OpeningAddons;
