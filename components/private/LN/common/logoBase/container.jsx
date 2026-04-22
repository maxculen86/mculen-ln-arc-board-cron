import React from 'react';

import {
    dictionaryAlt,
    getSectionLogo,
    getCustomSectionLogo
} from '../../../common/utils/sectionUtils';
import ModSponsor from '../../../common/mod-sponsor';
import ComLogo from '../../../common/com-logo';
import getTargetAndRelIfExternal from '../../../common/utils/getTargetAndRelIfExternal';
import { appendPageReferrerParam } from '../utils/pageReferrer';

function LogoBaseContainer({
    sections,
    layout,
    distributor,
    sponsored = false,
    advertiser = '',
    tooltip = ''
}) {
    const { name: distributorName } = distributor || {};
    const sectionData =
        getSectionLogo(sections, layout, distributorName) ||
        getCustomSectionLogo({ sections, layout });

    const { path, logoName, color, isExternal } = sectionData || {
        path: null,
        logoName: null,
        color: null,
        isExternal: null
    };

    const decoratedPath = path ? appendPageReferrerParam(path) : path;

    const altLogo = dictionaryAlt[logoName]
        ? dictionaryAlt[logoName]
        : logoName;

    const sponsor = !color && logoName ? `${logoName}${'-blanco'}` : logoName;

    const { target, rel } = getTargetAndRelIfExternal(isExternal);

    if (sponsored) {
        return (
            <ModSponsor
                type={`${advertiser ? '--contentlab' : ''}`}
                logoName={logoName}
                sponsor={sponsor}
                textName={advertiser}
                link={decoratedPath}
                target={target}
                rel={rel}
                tooltip={tooltip}
            />
        );
    }

    return (
        <ComLogo
            href={decoratedPath}
            title={altLogo}
            target={target}
            rel={rel}
            logoName={sponsor}
            alt={altLogo}
            size="--sm"
        />
    );
}

export default LogoBaseContainer;
