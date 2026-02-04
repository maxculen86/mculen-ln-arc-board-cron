import React from 'react';
import { RoofFoodit } from '../RoofFoodit/foodit';
import { MediaScroller } from './MediaScroller';

export function CarouselVideo({ children, titleRoof }) {
    return (
        <div>
            <div className="static">
                <RoofFoodit title={{ text: titleRoof, as: 'h3' }} />
            </div>
            <div data-tw>
                <MediaScroller>{children}</MediaScroller>
            </div>
        </div>
    );
}
