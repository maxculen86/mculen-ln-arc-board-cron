import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import ShareVideo from '../../features/LN-common/shareVideo/default';
import { carouselVideoExpandedClasses } from '../../features/LN-common/shareVideo/styles';
import trackShareView from './_helper';
import VideoPlayerSnippet from '../../private/common/scriptManager/snippetVideo';

function CarouselVideoExpanded(props) {
    const { globalContent } = props;
    const {
        _id: videoId,
        headlines: { basic } = {},
        variant,
        min_stream: minStream
    } = globalContent;

    useEffect(() => {
        trackShareView(videoId, basic);
    }, [videoId, basic]);

    return (
        <main className="bg-light-900">
            <div className={carouselVideoExpandedClasses({ variant })}>
                <ShareVideo videoId={videoId} variant={variant} />
                <VideoPlayerSnippet
                    mediaData={globalContent}
                    minStream={minStream}
                />
            </div>
        </main>
    );
}

CarouselVideoExpanded.sections = ['Cuerpo'];

export default Consumer(CarouselVideoExpanded);
