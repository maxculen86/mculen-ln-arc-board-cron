import React from 'react';
import OpeningDescription from './OpeningDescription';
import OpeningMedia from './OpeningMedia';

function LiveBlogOpening({ children }) {
    return (
        <div className="bg-neutral-dark-1">
            <div className="lay px-0_max767 px-40_xl">
                <div className="row">
                    <div className="grid gap-24 pb-16 pb-24_m pb-32_lg w-100 grid-cols-12_m px-24_m grid-cols-16_lg gap-32_lg px-32_xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

LiveBlogOpening.Description = OpeningDescription;
LiveBlogOpening.Media = OpeningMedia;

export default LiveBlogOpening;
