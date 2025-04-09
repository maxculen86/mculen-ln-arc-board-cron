import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import ShareVideo from '../../features/LN-common/shareVideo/default';
import trackShareView from './_helper';

function CarouselVideoExpanded(props) {
    const { globalContent } = props;
    const { _id: videoId, headlines: { basic } = {} } = globalContent;

    useEffect(() => {
        trackShareView(videoId, basic);
    }, [videoId, basic]);

    return (
        <main className="w-100 h-100dvh bg-light-900 flex jc-center ai-center">
            <ShareVideo videoId={videoId} />
        </main>
    );
}

CarouselVideoExpanded.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }).isRequired
    }).isRequired
};

CarouselVideoExpanded.sections = ['Cuerpo'];

export default Consumer(CarouselVideoExpanded);
