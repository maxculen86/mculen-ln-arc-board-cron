import React from 'react';
import SpecialVideoItem from './specialVideoItem';
import get from 'lodash.get';

export default function SpecialVideo({ videos }) {
    const specialVideos = videos.map((video, index) => {
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const url = get(video, 'canonical_url', null);

        return <SpecialVideoItem key={index} imgSrc={imgSrc} url={url} />;
    });
    return <div>{specialVideos}</div>;
}
