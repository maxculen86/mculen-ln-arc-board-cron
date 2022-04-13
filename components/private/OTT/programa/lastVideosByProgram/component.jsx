import React from 'react';
import Proptypes from 'prop-types';
import get from 'lodash.get';
import ShowMoreVideos from './showMoreVideos';
import Title from '../../../common/title';
import VideoArticle from '../../common/videoArticle';
import VideoOpeningTitle from '../../home/videoOpeningTitle';

export default function LastVideosByProgams({
    videos,
    nextPageHandler,
    hasNext,
    programName
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
            <VideoOpeningTitle title={programName} />
            <Title title="Últimos Videos" className="section-title" />
            {currentItem}
            {hasNext && <ShowMoreVideos onClick={nextPageHandler} />}
        </section>
    );
}

LastVideosByProgams.propTypes = {
    programName: Proptypes.string.isRequired
};
