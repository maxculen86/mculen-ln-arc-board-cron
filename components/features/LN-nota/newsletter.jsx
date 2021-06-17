import React from 'react';
import Lazy from 'lazy-child';
import Newsletter from '../../private/LN/common/newsletter';
import AmpContainer from '../../private/common/ampContainer';

const NewsLetter = () => {
    return (
        <Lazy
            renderPlaceholder={ref => {
                return <div ref={ref} />;
            }}
            offsetTop="750"
        >
            <AmpContainer isForAmp={false}>
                <Newsletter />
            </AmpContainer>
        </Lazy>
    );
};

NewsLetter.label = 'LN-Common-Newsletter';

export default NewsLetter;
