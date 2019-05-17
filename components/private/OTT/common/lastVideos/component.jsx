import React from 'react';
import Carousell from '../../../common/carousell';
import VideoArticle from '../../common/videoArticle';
import get from 'lodash.get';
import Title from '../../../common/title';

export default function LastVideos({ videos }) {
    const currentItem = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const videoId = get(video, '_id', null);
        const publishDate = get(video, 'first_publish_date', null);
        const href = get(video, 'website_url', null);
        return (
            <VideoArticle
                key={index}
                description={title}
                imgSrc={imgSrc}
                id={videoId}
                date={publishDate}
                href={href}
            />
        );
    });
    return (
        <section className={'ultimos-videos'}>
            <Title className={'section-title'} title={'Últimos videos'} />
            <Carousell>{currentItem}</Carousell>
        </section>
    );
}
