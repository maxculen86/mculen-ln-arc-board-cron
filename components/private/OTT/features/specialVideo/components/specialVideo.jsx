import React from 'react';
import SpecialVideoItem from '../containers/specialVideoItem';
import get from 'lodash.get';

export default function SpecialVideo({ videos }) {
    return videos.map((video, index) => {
        const imgSrc = get(video, 'promo_items.basic.url', null)

        return (<SpecialVideoItem key={index} imgSrc={imgSrc}/>)
    })
}
