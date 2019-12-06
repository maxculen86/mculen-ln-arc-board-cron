import React from 'react';
import CarousellComponent from './component';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import Slider from '../../OTT/common/hocs/slider';

const DEFAULT_PAGESIZE = 4;

const Carousell = props => {
    const { slider, children } = props;
    return (
        <CarousellComponent>
            {slider.hasPrevPage() && (
                <CarousellPrevButton onClick={slider.prevButtonHandler} />
            )}
            {children}
            {slider.hasNextPage() && (
                <CarousellNextButton onClick={slider.nextButtonHandler} />
            )}
        </CarousellComponent>
    );
};

export default Slider(Carousell, DEFAULT_PAGESIZE);
