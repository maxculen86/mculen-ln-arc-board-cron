import React from 'react';
import get from '../../../common/utils/get';
import Carousell from '../../../common/carousell';
import VideoArticle from '../videoArticle';
import Title from '../../../common/title';

export default function LastVideos({ videos = [] }) {
    const currentItem = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const href = get(video, 'website_url', null);
        return (
            <VideoArticle
                key={index}
                description={title}
                imgSrc={imgSrc}
                href={href}
            />
        );
    });
    return (
        <section className="ultimos-videos">
            <Title className="section-title" title="Últimos videos" />
            <Carousell>{currentItem}</Carousell>
        </section>
    );
}
