import React from 'react';
import Lazy from 'lazy-child';
import { LAZY_OFFSETTOP } from 'fusion:environment';
import Newsletter from '../../private/LN/common/newsletter';
import AmpContainer from '../../private/common/ampContainer';

const NewsLetter = () => {
    return (
        <Lazy
            renderPlaceholder={ref => {
                return <div ref={ref} />;
            }}
            offsetTop={LAZY_OFFSETTOP}
        >
            <AmpContainer isForAmp={false}>
                <Newsletter />
            </AmpContainer>
        </Lazy>
    );
};

NewsLetter.label = 'LN-Common-Newsletter';
NewsLetter.lazy = true;

export default NewsLetter;
