import React from 'react';
import get from 'lodash.get';
import ShowMoreVideos from './showMoreVideos';
import Title from '../../../common/title';
import VideoArticle from '../../common/videoArticle';

export default function LastVideosByProgams({
    videos,
    nextPageHandler,
    hasNext
}) {
    const currentItem = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const href = get(video, 'website_url', null);
        return (
            <VideoArticle
                description={title}
                key={index}
                imgSrc={imgSrc}
                href={href}
            />
        );
    });
    return (
        <section className="slider">
            <Title title="Últimos Videos" className="section-title" />
            {currentItem}
            {hasNext && <ShowMoreVideos onClick={nextPageHandler} />}
        </section>
    );
}
