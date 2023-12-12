import React from 'react';
import get from '../../../common/utils/get';
import Carousell from '../../../common/carousell';
import VideoArticle from '../videoArticle';
import Title from '../../../common/title';
import { useContent } from 'fusion:content';

const LastVideos = () => {
    const media = useContent({
        source: 'ottLastVideoJwSource',
        query: {}
    });

    const videos = get(media, 'jwVideosformatted', []);

    const currentItem = videos.map(video => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'resized_url', null);
        const href = get(video, 'website_url', null);
        return (
            <VideoArticle
                key={title}
                description={title}
                imgSrc={imgSrc}
                href={href}
            />
        );
    });
    return (
        videos && (
            <section className="ultimos-videos">
                <Title className="section-title" title="Últimos videos" />
                <Carousell>{currentItem}</Carousell>
            </section>
        )
    );
};

export default LastVideos;
