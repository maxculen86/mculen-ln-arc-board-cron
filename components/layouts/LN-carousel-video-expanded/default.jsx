import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import ShareVideo from '../../features/LN-common/shareVideo/default';
import trackShareView from './_helper';
import { carouselVideoExpandedClasses } from '../../features/LN-common/shareVideo/styles';

function CarouselVideoExpanded(props) {
    const { globalContent } = props;
    const { _id: videoId, headlines: { basic } = {}, variant } = globalContent;

    useEffect(() => {
        trackShareView(videoId, basic);
    }, [videoId, basic]);

    return (
        <main className="bg-light-900">
            <div className={carouselVideoExpandedClasses({ variant })}>
                <ShareVideo videoId={videoId} variant={variant} />
            </div>
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
