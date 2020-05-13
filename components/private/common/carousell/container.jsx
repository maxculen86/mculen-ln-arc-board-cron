import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModMedia from '../mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import ComButton from '../com-button';
import withSlider from '../hocs/withSlider';

const DEFAULT_PAGESIZE = 4;

const Carousell = ({ slider, children, itsGallery, active, arcSite }) => {
    if (arcSite === 'ott')
        return (
            <section className="slider com-slider">
                {slider.hasPrevPage() && (
                    <CarousellPrevButton onClick={slider.prevButtonHandler} />
                )}
                {children}
                {slider.hasNextPage() && (
                    <CarousellNextButton onClick={slider.nextButtonHandler} />
                )}
            </section>
        );
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
                    />
                )}
                {children}
                {slider.hasNextPage() && (
                    // <CarousellNextButton onClick={slider.nextButtonHandler} />
                    <ComButton
                        onClick={slider.nextButtonHandler}
                        classCondition="icon-right"
                    />
                )}
            </div>
        </ModMedia>
    );
};

Carousell.propTypes = {
    slider: PropTypes.shape({
        hasPrevPage: PropTypes.func,
        hasNextPage: PropTypes.func,
        prevButtonHandler: PropTypes.func,
        nextButtonHandler: PropTypes.func
    }).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    itsGallery: PropTypes.bool,
    active: PropTypes.bool,
    arcSite: PropTypes.string.isRequired
};
Carousell.defaultProps = {
    itsGallery: undefined,
    active: undefined
};
export default withSlider(Carousell, DEFAULT_PAGESIZE);
