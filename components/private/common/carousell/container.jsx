import React from 'react';
import ModMedia from '../../common/mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import withSlider from '../hocs/withSlider';

const DEFAULT_PAGESIZE = 4;

const Carousell = props => {
    const { slider, children, itsGallery, media, width } = props;
    return (
        <ModMedia classCondition="--slider" withZoom={itsGallery && '--zoom'}>
            {slider.hasPrevPage() && (
                <CarousellPrevButton onClick={slider.prevButtonHandler} />
            )}
            {children}
            {slider.hasNextPage() && (
                <CarousellNextButton onClick={slider.nextButtonHandler} />
            )}
        </ModMedia>
    );
};

export default withSlider(Carousell, DEFAULT_PAGESIZE);
