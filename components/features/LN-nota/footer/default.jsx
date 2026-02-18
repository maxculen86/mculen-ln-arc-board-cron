import React, { useContext } from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import ExternalSignature from './_children/externalSiganture';
import Logo from './_children/logo';
import TrustProject from './_children/trustProject';
import get from '../../../private/common/utils/get';
import getTooltip from '../../../private/LN/common/utils/getTooltip';
import { GlobalContext } from '../../../private/common/context/globalContext';
import Signature from './_children/signature';
import Themes from './_children/themes';
import { getSectionLogo } from '../../../private/common/utils/sectionUtils';
import { isInvalidLogo } from './_utils/helper';
import { RECETA } from '../../../private/common/utils/subtypes/subtypeHelper';

function Footer(props) {
    const { globalContent, layout } = props;

    const {
        label,
        owner,
        subtype,
        taxonomy: { sections },
        distributor
    } = globalContent;

    const globalContext = useContext(GlobalContext);
    const trust = get(label, 'trust.text', null);
    const advertiser = get(label, 'marca_anunciante.text', null);
    const sponsored = get(owner, 'sponsored', false);

    const isInvalid =
        trust === 'No mostrar Trust' ||
        advertiser ||
        sponsored ||
        subtype === RECETA;

    const siteService = get(globalContext, 'state.siteService', {});
    const tooltip = getTooltip(trust, siteService);

    const { name } = distributor || {};
    const logoData = getSectionLogo(sections, layout, name);

    const showDivider = !isInvalidLogo(logoData) && !isInvalid;
    const showLogoOrTrust = !isInvalidLogo(logoData) || !isInvalid;

    return (
        <section className="container-center-100 mb-40 border border-bottom border-thin border-neutral-light-700">
            <div className="grid grid-cols-2_m gap-12 py-16 py-12_m">
                <div className="flex flex-column gap-12">
                    <Signature globalContent={globalContent} isNotaFooter />
                    <ExternalSignature globalContent={globalContent} />
                </div>
                <Themes globalContent={globalContent} />
            </div>
            {showLogoOrTrust && (
                <>
                    <hr />
                    <div className="flex flex-column flex-row_m gap-16 mb-40 ai-stretch py-16 py-12_m">
                        <Logo logoData={logoData} />
                        {showDivider && <hr className="vertical sm-none" />}
                        <TrustProject
                            isInvalid={isInvalid}
                            tooltipData={tooltip}
                        />
                    </div>
                </>
            )}
            <div id="fin-de-nota" />
        </section>
    );
}

Footer.label = 'LN-Nota-Pie-De-Nota';

Footer.propTypes = {
    globalContent: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired
};

export default Context(Footer);
