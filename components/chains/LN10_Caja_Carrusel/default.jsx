import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import { useRoofData } from '../utils/_helpers';
import useGetElementsToScroll from './hooks/useGetElementsToScroll';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import BuildRoof from '../utils/_BuildRoof/default';
import ArrowButton from './components/arrowButton';

import '../../../resources/packages/css/@ln/common-ui-mediascroller/index.css';

function CajaCarrusel({
    children,
    customFields: { hideCarousel, ...propsForRoof },
    childProps
}) {
    const { isAdmin } = useAppContext();
    const { containerRef, elementsToScroll, itemCarouselWidth } =
        useGetElementsToScroll();

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        isStatic: false
    });

    const error = validateCarruselChildren({ children, childProps });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    if (hideCarousel) {
        return null;
    }
    return (
        <div ref={containerRef} className="mb-32">
            <BuildRoof {...roofData} />
            <Mediascroller
                className="grid w-100"
                elementsToScroll={elementsToScroll}
            >
                <Mediascroller.Track
                    className="pb-32"
                    fixedElementsSize={itemCarouselWidth}
                >
                    {children.slice(0, 10)}
                </Mediascroller.Track>
                <Mediascroller.Arrows
                    arrowSize={16}
                    className="mx-6 rounded-24 bg-white"
                    buttonTag={ArrowButton}
                />
                <Mediascroller.Progress
                    containerClassName="w-171 h-5 mx-auto bg-light-100 rounded-24"
                    className="bg-blue-500 rounded-24 transition-linear"
                />
            </Mediascroller>
        </div>
    );
}

CajaCarrusel.label = 'LN10 Caja Carrusel';

CajaCarrusel.propTypes = {
    isAdmin: PropTypes.isRequired,
    children: PropTypes.isRequired,
    childProps: PropTypes.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        logoId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        }),
        navigator: PropTypes.string.tag({
            name: 'Navegador',
            description:
                'Ingrese aquí el nombre de una navegación creada en site services',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonLogo: PropTypes.string.tag({
            name: 'Logo Boton',
            description: 'Ingrese aquí el id del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description: 'Ingrese aquí el texto del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        buttonStyle: PropTypes.oneOf(Object.keys(typesButtonStyle)).tag({
            label: 'Estilo del boton',
            defaultValue: 'generic',
            description: 'Cambiar el diseño de la caja',
            group: 'Techo',
            labels: typesButtonStyle,
            hidden: false
        }),
        hideCarousel: PropTypes.boolean.tag({
            name: 'Ocultar Carousel',
            description: 'Marque para ocultar el carousel',
            defaultValue: false
        }).isRequired
    }).isRequired
};

export default Consumer(CajaCarrusel);
