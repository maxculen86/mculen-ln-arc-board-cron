/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';

import Trust from '../../private/LN/nota/trust';

import get from '../../private/common/utils/get';

const TrustFeature = props => {
    const {
        globalContent: { subtype, label }
    } = props;

    const trust = get(label, 'mostrar_trust.text', null);

    if (!trust || trust === 'No') return null;
    if (subtype === '7') return null;
    return <Trust />;
};

TrustFeature.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.string.isRequired,
        label: PropTypes.shape({
            mostrar_trust: PropTypes.shape({
                text: PropTypes.string
            })
        })
    })
};

TrustFeature.label = 'LN-Nota-Trust';

export default Context(TrustFeature);
