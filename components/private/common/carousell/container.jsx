import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ModMedia from '../mod-media';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
import withSlider from '../hocs/withSlider';
import classNames from 'classnames';

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
                    <Button
                        onClick={slider.prevButtonHandler}
                        className={classNames(
                            'absolute  bottom-50 bg-black p-8 z-1',
                            active ? 'left-0' : 'left--16 left-0_md'
                        )}
                        variant="custom"
                        size="inherit"
                        iconOnly
                    >
                        <Icon>
                            <IconSprite name="arrowLeft" fill="#fff" />
                        </Icon>
                    </Button>
                )}
                {children}
                {slider.hasNextPage() && (
                    // <CarousellNextButton onClick={slider.nextButtonHandler} />
                    <Button
                        onClick={slider.nextButtonHandler}
                        className={classNames(
                            'absolute  bottom-50 bg-black p-8 z-1',
                            active ? 'right-0' : 'right--16 right-0_md'
                        )}
                        variant="custom"
                        size="inherit"
                        iconOnly
                    >
                        <Icon>
                            <IconSprite name="arrowRight" fill="#fff" />
                        </Icon>
                    </Button>
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
