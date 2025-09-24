import React from 'react';
import PropTypes from 'prop-types';
import HowTo from './default';
import get from '../../../private/common/utils/get';

function HowToBody({ data: element }) {
    const number = Number(get(element, 'embed.config.step'));
    const title = get(element, 'embed.config.title', '');

    return <HowTo number={number} title={title} id={`step${number}`} />;
}

HowToBody.arcType = 'custom-how-to';
HowToBody.propTypes = {
    data: PropTypes.shape({
        type: PropTypes.oneOf(['custom_embed']).isRequired,
        subtype: PropTypes.oneOf(['custom-how-to']).isRequired,
        embed: PropTypes.shape({
            config: PropTypes.shape({
                step: PropTypes.number,
                title: PropTypes.string
            }).isRequired
        }).isRequired
    }).isRequired
};

export default HowToBody;
