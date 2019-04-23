import React from 'react';
import Carousell from '../../../../common/containers/carousell';
import LastVideoItem from '../containers/lastVideoItem';
import get from 'lodash.get';
import Title from '../../../../common/containers/title';

export default function LastVideos({ videos }) {
    const currentItem = videos.map((video, index) => {
        const title = get(video, 'headlines.basic', null);
        const imgSrc = get(video, 'promo_items.basic.url', null);

        return <LastVideoItem title={title} key={index} imgSrc={imgSrc} />;
    });
    return (
        <section className={'ultimos-videos'}>
            <Title className={'section-title'} title={'Últimos videos'} />
            <Carousell>{currentItem}</Carousell>
        </section>
    );
}
