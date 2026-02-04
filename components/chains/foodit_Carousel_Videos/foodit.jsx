import React, { useMemo } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { validateCarouselVideos, transformNodes } from './_helper';
import { CarouselVideo } from '../../features/foodit-global/common/CarrouselVideoFoodit/CarouselVideo';
import MediaScrollerExpandedWrapper from './mediaScrollerExpanded/wrapper';
import { MediaScrollerExpanded } from './mediaScrollerExpanded/MediaScrollerExpanded';
import CajaCarruselProvider from './cajaCarruselContext';

function CarouselVideoChain(props) {
    const {
        isAdmin,
        children,
        customFields: { hideCarousel, title },
        childProps = []
    } = props;
    const error = validateCarouselVideos({ children });
    if (hideCarousel) {
        return null;
    }
    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    const nodesByExpanded = useMemo(
        () =>
            transformNodes({
                children,
                childProps
            }),
        [children, childProps]
    );

    return (
        <CajaCarruselProvider>
            <CarouselVideo titleRoof={title || 'Videos'}>
                {children}
            </CarouselVideo>
            <MediaScrollerExpandedWrapper>
                <MediaScrollerExpanded listVideoData={nodesByExpanded} />
            </MediaScrollerExpandedWrapper>
        </CajaCarruselProvider>
    );
}

CarouselVideoChain.label = 'Foodit Caja Carrusel Videos';

CarouselVideoChain.lazy = true;

CarouselVideoChain.propTypes = {
    children: PropTypes.isRequired,
    childProps: PropTypes.array.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        hideCarousel: PropTypes.boolean.tag({
            name: 'Ocultar Carousel',
            description: 'Marque para ocultar el carousel',
            defaultValue: false
        }).isRequired
    }).isRequired
};

export default Consumer(CarouselVideoChain);
