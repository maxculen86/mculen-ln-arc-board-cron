import React from 'react';
import get from '../../../../../private/common/utils/get';
import HowToComponent from '../../../common/howTo/default';
import { WrapperBody } from '../../../common/wrapperBody/default';

function HowTo({ data: element }) {
    const number = Number(get(element, 'embed.config.step'));
    const title = get(element, 'embed.config.title', '');

    return (
        <WrapperBody>
            <HowToComponent number={number} title={title} />
        </WrapperBody>
    );
}

HowTo.arcType = 'custom-how-to';
export default HowTo;
