import React from 'react';
import Context from 'fusion:context';
import ExternalSignature from './_children/externalSiganture';
import Logo from './_children/logo';
import TrustProject from './_children/trustProject';
import get from '../../../private/common/utils/get';
import Signature from './_children/signature';
import Themes from './_children/themes';
import {
    getCustomSectionLogo,
    getSectionLogo
} from '../../../private/common/utils/sectionUtils';
import { isInvalidLogo } from './_utils/helper';
import { RECETA } from '../../../private/common/utils/subtypes/subtypeHelper';
import {
    shouldShowNoteFooterTopSection,
    shouldShowSignatureColumn
} from './_utils/topRenderConditions';
import useSiteTooltip from '../../../private/common/hooks/useSiteTooltip';

function Footer(props) {
    const { globalContent, layout, siteProperties } = props;

    const {
        label,
        owner,
        subtype,
        taxonomy: { sections },
        distributor
    } = globalContent;
    const trust = get(label, 'trust.text', null);
    const advertiser = get(label, 'marca_anunciante.text', null);
    const sponsored = get(owner, 'sponsored', false);
    const tooltipData = useSiteTooltip(trust);

    const isInvalid =
        trust === 'No mostrar Trust' ||
        advertiser ||
        sponsored ||
        subtype === RECETA;

    const { name } = distributor || {};
    const logoData =
        getSectionLogo(sections, layout, name) ||
        getCustomSectionLogo({ sections, layout });

    const showDivider = !isInvalidLogo(logoData) && !isInvalid;
    const showLogoOrTrust = !isInvalidLogo(logoData) || !isInvalid;

    const showTopSection = shouldShowNoteFooterTopSection({
        globalContent,
        layout,
        siteProperties
    });

    const showSignatureColumn = shouldShowSignatureColumn({
        globalContent,
        layout,
        siteProperties
    });

    return (
        <section className="container-center-100 mb-40 border border-bottom border-thin border-neutral-light-700">
            {showTopSection && (
                <div className="grid grid-cols-2_m gap-12 py-16 py-12_m">
                    {showSignatureColumn && (
                        <div className="flex flex-column gap-12">
                            <Signature
                                globalContent={globalContent}
                                isNotaFooter
                            />
                            <ExternalSignature globalContent={globalContent} />
                        </div>
                    )}
                    <Themes globalContent={globalContent} />
                </div>
            )}
            {showTopSection && showLogoOrTrust && <hr />}
            {showLogoOrTrust && (
                <div className="flex flex-column flex-row_m gap-16 mb-40 ai-stretch py-16 py-12_m">
                    <Logo logoData={logoData} />
                    {showDivider && <hr className="vertical sm-none" />}
                    <TrustProject
                        isInvalid={isInvalid}
                        tooltipData={tooltipData}
                    />
                </div>
            )}
            <div id="fin-de-nota" />
        </section>
    );
}

Footer.label = 'LN-Nota-Pie-De-Nota';

export default Context(Footer);
