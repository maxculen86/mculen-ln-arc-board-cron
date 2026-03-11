import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Carousel } from '../foodit-global/common/Carousel/foodit';
import { validateCarouselCategory } from './_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { RoofFoodit } from '../../features/foodit-global/common/RoofFoodit/foodit';

function CarouselCategory({
    isAdmin = false,
    children,
    classNameRoof,
    customFields: { hideCarousel, hideTitle, link, title }
}) {
    const error = validateCarouselCategory({ children });
    if (hideCarousel) {
        return null;
    }
    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    return (
        <div>
            <RoofFoodit
                title={{ text: title }}
                hide={hideTitle || !title}
                className={classNameRoof}
                linkProps={{ href: link, text: title }}
            />
            <Carousel type="category">{children}</Carousel>
        </div>
    );
}

CarouselCategory.label = 'foodit Carousel Category';

CarouselCategory.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    classNameRoof: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        hideTitle: PropTypes.bool.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: false,
            group: 'Techo'
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        link: PropTypes.string.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        hideCarousel: PropTypes.bool.tag({
            name: 'Ocultar Carousel',
            description: 'Marque para ocultar el carousel',
            defaultValue: false
        })
    }).isRequired
};

export default Consumer(CarouselCategory);
