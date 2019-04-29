import React from 'react';
import LastVideoItem from '../../lastVideos/components/lastVideoItem';
import ShowMoreVideos from '../containers/showMoreVideos';
import get from 'lodash.get';
import Title from '../../../common/containers/title';

export default function LastVideosByProgams({
    videos,
    nextPageHandler,
    hasNext
}) {
    const currentItem = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);
        const id = get(video, '_id', null);

        return (
            <LastVideoItem title={title} key={index} imgSrc={imgSrc} id={id} />
        );
    });
    return (
        <section className={'slider'}>
            <Title title={'Últimos Videos'} className={'section-title'} />
            {currentItem}
            {hasNext && <ShowMoreVideos onClick={nextPageHandler} />}
        </section>
    );
}
