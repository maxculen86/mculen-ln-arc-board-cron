import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { useAppContext } from 'fusion:context';
import { Divider } from '@ln/ds-common-divider';
import { cx } from '@ln/ds-cva';
import get from '../../../../../private/common/utils/get';
import LogoImage from '../../../../../features/ui/ln/logoImage/default';
import {
    dictionaryAlt,
    getSectionLogo,
    getCustomSectionLogo,
    getAFondoLogo
} from '../../../../../private/common/utils/sectionUtils';
import getTargetAndRelIfExternal from '../../../../../private/common/utils/getTargetAndRelIfExternal';
import { appendPageReferrerParam } from '../../../../../private/LN/common/utils/pageReferrer';

function OpeningAddons({
    globalContent = {},
    layout = '',
    classnames = {},
    diagram = ''
}) {
    const { deployment, contextPath } = useAppContext();
    const sections = get(globalContent, 'taxonomy.sections', []);
    const tags = get(globalContent, 'taxonomy.tags', []);
    const distributorName = get(globalContent, 'distributor.name', 'LA NACION');
    const aFondoLogo = getAFondoLogo(tags, layout);
    const logoData =
        aFondoLogo ||
        getSectionLogo(sections, layout, distributorName) ||
        getCustomSectionLogo({ sections, layout }) ||
        {};
    const {
        logoName = '',
        path = '',
        color = true,
        isExternal = false
    } = logoData;
    const withColor = ['image-panoramic'].includes(diagram) || color;
    const sponsor = !withColor && logoName ? `${logoName}-blanco` : logoName;
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
    const showDividerSponsor =
        sponsor && (showContentLab || isSubscriberContent);
    const showDividerContentLab = showContentLab && isSubscriberContent;
    if (!hasAddons) return null;

    return (
        <div
            className={cx(
                'flex items-center justify-center gap-8 flex-col md:flex-row',
                classnames.container
            )}
        >
            {/* Brands */}
            {sponsor && (
                <LogoImage
                    src={deployment(
                        `${contextPath}/resources/images/${sponsor}.svg`
                    )}
                    logoName={sponsor}
                    size="sm"
                    alt={logoAlt}
                    href={decoratedPath}
                    target={target}
                    rel={rel}
                />
            )}

            {showDividerSponsor && (
                <Divider className="hidden md:block" direction="vertical" />
            )}

            {/* Content Lab */}
            {showContentLab && (
                <span
                    className={cx(
                        'font-bold text-16 text-white',
                        classnames.contentLab
                    )}
                >{`Content LAB para ${advertiser}`}</span>
            )}

            {showDividerContentLab && (
                <Divider className="hidden md:block" direction="vertical" />
            )}

            {/* Suscriptores */}
            {isSubscriberContent && (
                <Badge type="subscriber">Suscriptores</Badge>
            )}
        </div>
    );
}

export default OpeningAddons;
