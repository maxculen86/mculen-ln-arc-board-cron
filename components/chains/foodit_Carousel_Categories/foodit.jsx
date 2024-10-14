import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Carousel } from '../foodit-global/common/Carousel/foodit';
import { validateCarouselCategory } from './_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

function CarouselCategory({ isAdmin, children }) {
    const error = validateCarouselCategory({ children });
    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    return <Carousel type="category">{children}</Carousel>;
}

CarouselCategory.label = 'foodit Carousel Category';

CarouselCategory.propTypes = {
    isAdmin: PropTypes.isRequired,
    children: PropTypes.isRequired
};

export default Consumer(CarouselCategory);
