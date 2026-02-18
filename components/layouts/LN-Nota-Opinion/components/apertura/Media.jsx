import React from 'react';
import { getMediaItem } from '../../../helpers/mediaHelper';
import { Caption } from '../../../../features/LN/common/caption/default';

function Media({ data }) {
    const { mediaData, caption, attribution } = data;
    const mediaItem = getMediaItem({ mediaData });

    if (!mediaItem) return null;

    return (
        <div className="w-full md:grid md:justify-items-center md:grid-cols-12 xl:grid-cols-16 md:gap-x-24 xl:gap-x-32">
            <figure className="w-full max-w-750 xl:max-w-none md:col-span-12 xl:col-start-4 xl:col-span-10 flex flex-col ">
                {mediaItem}
                <Caption caption={caption} credit={attribution} />
            </figure>
        </div>
    );
}

export default Media;
