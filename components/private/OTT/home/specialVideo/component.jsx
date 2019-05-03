import React from 'react';
import get from 'lodash.get';
import VideoArticle from '../../common/videoArticle';

export default function SpecialVideo({ videos }) {
    const specialVideos = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const id = get(video, '_id', null);

        console.log(title, imgSrc, id);
        return (
            <VideoArticle
                description={title}
                key={index}
                imgSrc={imgSrc}
                id={id}
            />
        );
    });
    console.log('specialVideos', specialVideos);
    return (
        <section className={'especiales'}>
            <h2 className={'section-title'}>LN+ Especiales</h2>
            <section className={'box-4'}>{specialVideos}</section>
        </section>
    );
}
