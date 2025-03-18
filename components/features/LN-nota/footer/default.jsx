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

function Footer(props) {
    const { globalContent, layout } = props;
    const { label, owner, subtype } = globalContent;
    const globalContext = useContext(GlobalContext);
    const trust = get(label, 'trust.text', null);
    const advertiser = get(label, 'marca_anunciante.text', null);
    const sponsored = get(owner, 'sponsored', false);
    const isInvalid =
        trust === 'No mostrar Trust' ||
        advertiser ||
        sponsored ||
        subtype === '7';

    const siteService = get(globalContext, 'state.siteService', {});
    const tooltip = getTooltip(trust, siteService);

    return (
        <>
            <Signature globalContent={globalContent} />
            <Logo globalContent={globalContent} layout={layout} />
            <ExternalSignature globalContent={globalContent} />
            <Themes globalContent={globalContent} />
            <TrustProject isInvalid={isInvalid} tooltipData={tooltip} />
        </>
    );
}

Footer.label = 'LN-Nota-Pie-De-Nota';

Footer.propTypes = {
    globalContent: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired
};

export default Context(Footer);
