import React, { useRef } from 'react';
import BuildRoof from '../../../utils/_BuildRoof/default';
import MediaScroller from '../../../../features/ui/ln/mediaScroller/default';

function MediaScrollerContainer({ children, roofData }) {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="mb-32">
            <BuildRoof {...roofData} />
            <div data-tw>
                <MediaScroller
                    elementsToScroll="visible"
                    responsive={{ base: { gap: '16px', width: '280px' } }}
                    className="z-1"
                >
                    {children}
                </MediaScroller>
            </div>
        </div>
    );
}

export default MediaScrollerContainer;
