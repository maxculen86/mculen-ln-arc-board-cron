import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import get from '../../../private/common/utils/get';
import TrustProject from '../../LN-10-global/common/trustProject/default';
import { GlobalContext } from '../../../private/common/context/globalContext';
import getTooltip from '../../../private/LN/common/utils/getTooltip';

const TrustFeature = props => {
    const {
        globalContent: { label, owner, subtype }
    } = props;

    const globalContext = useContext(GlobalContext);
    const trust = get(label, 'trust.text', null);
    const advertiser = get(label, 'marca_anunciante.text', null);
    const sponsored = get(owner, 'sponsored', false);
    const isInvalid =
        trust === 'No mostrar Trust' ||
        advertiser ||
        sponsored ||
        subtype === '7';

    if (isInvalid) return null;

    const siteService = get(globalContext, 'state.siteService', {});
    const tooltip = getTooltip(trust, siteService);

    return <TrustProject tooltipData={tooltip} />;
};

TrustFeature.propTypes = {
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            trust: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        owner: PropTypes.shape({
            sponsored: PropTypes.bool
        })
    })
};

TrustFeature.label = 'LN-Nota-Trust-Project';

export default Context(TrustFeature);
