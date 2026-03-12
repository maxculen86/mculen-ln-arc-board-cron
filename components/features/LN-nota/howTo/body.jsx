import React from 'react';
import HowTo from './default';
import get from '../../../private/common/utils/get';

function HowToBody({ data: element }) {
    const number = Number(get(element, 'embed.config.step'));
    const title = get(element, 'embed.config.title', '');

    return <HowTo number={number} title={title} id={`step${number}`} />;
}

HowToBody.arcType = 'custom-how-to';

export default HowToBody;
