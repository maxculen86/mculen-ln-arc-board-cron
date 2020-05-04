import React from 'react';
//import CarousellComponent from './component';
import ModMedia from '../../common/mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import Slider from '../hocs/withSlider';

const DEFAULT_PAGESIZE = 4;

const Carousell = props => {
    const { slider, children } = props;
    return (
        // <CarousellComponent>
        <ModMedia classCondition="--slider">
            {slider.hasPrevPage() && (
                <CarousellPrevButton onClick={slider.prevButtonHandler} />
            )}
            {children}
            {slider.hasNextPage() && (
                <CarousellNextButton onClick={slider.nextButtonHandler} />
            )}
        </ModMedia>
        // </CarousellComponent>
    );
};

export default Slider(Carousell, DEFAULT_PAGESIZE);
