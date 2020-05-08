import React from 'react';
import ModMedia from '../mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import ComButton from '../../common/com-button';
import withSlider from '../hocs/withSlider';

const DEFAULT_PAGESIZE = 4;

const Carousell = props => {
    const { slider, children, itsGallery, active, media, width } = props;
    return (
        <ModMedia
            classCondition="--slider"
            itsGallery={itsGallery}
            active={active}
        >
            <div className="slide">
                {slider.hasPrevPage() && (
                    // <CarousellPrevButton onClick={slider.prevButtonHandler} />
                    <ComButton
                        onClick={slider.prevButtonHandler}
                        classCondition="icon-left"
                    ></ComButton>
                )}
                {children}
                {slider.hasNextPage() && (
                    // <CarousellNextButton onClick={slider.nextButtonHandler} />
                    <ComButton
                        onClick={slider.nextButtonHandler}
                        classCondition="icon-right"
                    ></ComButton>
                )}
            </div>
        </ModMedia>
    );
};

export default withSlider(Carousell, DEFAULT_PAGESIZE);
