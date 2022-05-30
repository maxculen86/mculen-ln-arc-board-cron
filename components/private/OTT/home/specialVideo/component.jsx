import React from 'react';
import get from 'lodash.get';
import VideoArticle from '../../common/videoArticle';

export default function SpecialVideo({ videos = [] }) {
    const specialVideos = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const href = get(video, 'website_url', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);

        return (
            <VideoArticle
                description={title}
                key={index}
                href={href}
                imgSrc={imgSrc}
            />
        );
    });
    return (
        <section className="especiales">
            <h3 className="section-title">LN+ Especiales</h3>
            <section className="box-4">{specialVideos}</section>
        </section>
    );
}
