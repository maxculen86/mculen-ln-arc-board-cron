import React from 'react';
import ModMedia from '../../common/mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import Slider from '../hocs/withSlider';

const DEFAULT_PAGESIZE = 4;

const Carousell = props => {
    const { slider, children, withZoom } = props;
    return (
        <ModMedia classCondition="--slider" withZoom={withZoom}>
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

export default Slider(Carousell, DEFAULT_PAGESIZE);
