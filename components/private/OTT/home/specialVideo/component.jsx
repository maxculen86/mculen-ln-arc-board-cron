import React from 'react';
import get from 'lodash.get';
import VideoArticle from '../../common/videoArticle';

export default function SpecialVideo({ videos }) {
    const specialVideos = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const id = get(video, '_id', null);
        const href = get(video, 'website_url', null);

        return (
            <VideoArticle description={title} key={index} href={href} id={id} />
        );
    });
    return (
        <section className={'especiales'}>
            <h2 className={'section-title'}>LN+ Especiales</h2>
            <section className={'box-4'}>{specialVideos}</section>
        </section>
    );
}
