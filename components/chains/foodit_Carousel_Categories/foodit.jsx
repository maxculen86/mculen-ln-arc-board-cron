import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Carousel } from '../foodit-global/common/Carousel/foodit';
import { validateCarouselCategory } from './_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

function CarouselCategory({
    isAdmin,
    children,
    customFields: { hideCarousel }
}) {
    const error = validateCarouselCategory({ children });
    if (hideCarousel) {
        return null;
    }
    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    return <Carousel type="category">{children}</Carousel>;
}

CarouselCategory.label = 'foodit Carousel Category';

CarouselCategory.propTypes = {
    isAdmin: PropTypes.bool,
    children: PropTypes.node.isRequired,
    customFields: PropTypes.shape({
        hideCarousel: PropTypes.bool.tag({
            name: 'Ocultar Carousel',
            description: 'Marque para ocultar el carousel',
            defaultValue: false
        })
    }).isRequired
};

CarouselCategory.defaultProps = {
    isAdmin: false
};

export default Consumer(CarouselCategory);
