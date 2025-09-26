import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import BuildRoof from '../../../utils/_BuildRoof/default';
import MediaScroller from '../../../../features/ui-ln/mediaScroller/default';

function MediaScrollerContainer({ children, roofData }) {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="mb-32">
            <BuildRoof {...roofData} />
            <div data-tw>
                <MediaScroller
                    elementsToScroll="visible"
                    responsive={{ base: { gap: '16px', width: '280px' } }}
                >
                    {children}
                </MediaScroller>
            </div>
        </div>
    );
}

MediaScrollerContainer.propTypes = {
    children: PropTypes.node.isRequired,
    roofData: PropTypes.shape({}).isRequired
};
export default MediaScrollerContainer;
