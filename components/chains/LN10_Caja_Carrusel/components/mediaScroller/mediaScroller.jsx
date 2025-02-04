import React from 'react';
import PropTypes from 'prop-types';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import BuildRoof from '../../../utils/_BuildRoof/default';
import { useGetElementsToScroll } from '../hooks';
import ArrowButton from './arrowButton';

function MediaScroller({ children, roofData }) {
    const { containerRef, elementsToScroll, itemCarouselWidth } =
        useGetElementsToScroll();
    return (
        <div ref={containerRef} className="mb-32">
            <BuildRoof {...roofData} />
            <Mediascroller
                className="grid w-100"
                elementsToScroll={elementsToScroll}
            >
                <Mediascroller.Track
                    className="pb-32"
                    fixedElementsSize={itemCarouselWidth}
                    xScrollBoundarySwipe
                >
                    {children}
                </Mediascroller.Track>
                <Mediascroller.Arrows
                    arrowSize={16}
                    className="mx-6 rounded-24 bg-white"
                    buttonTag={ArrowButton}
                />
                <Mediascroller.Progress
                    containerClassName="w-171 h-5 mx-auto bg-light-100 rounded-24"
                    className="bg-blue-500 rounded-24 transition-linear"
                />
            </Mediascroller>
        </div>
    );
}

MediaScroller.propTypes = {
    children: PropTypes.node.isRequired,
    roofData: PropTypes.shape({}).isRequired
};
export default MediaScroller;
