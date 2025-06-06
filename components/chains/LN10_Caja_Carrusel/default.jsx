import React, { useEffect, useRef, useMemo } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import { useRoofData } from '../utils/_helpers';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import CajaCarruselProvider from './components/cajaCarruselContext';
import MediaScrollerExpanded from './components/mediaScrollerExpanded/mediaScrollerExpanded';
import MediaScrollerExpandedWrapper from './components/mediaScrollerExpanded/wrapper';
import MediaScroller from './components/mediaScroller/mediaScroller';
import { isScriptLoaded, transformNodes } from './components/helpers';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import loadJWPlayerScript from '../utils/loadJWPlayerScript';
import hideParentNode from '../../features/private-global/common/utils/hideParentNode';
import '../../../resources/packages/css/@ln/common-ui-mediascroller/index.css';

function CajaCarrusel(props) {
    const {
        children,
        customFields: { hideCarousel, ...propsForRoof },
        childProps = [],
        chainId,
        renderables
    } = props;

    const divRefInCarrusel = useRef(null);

    const { isAdmin } = useAppContext();
    const playerId = 'OSRCuuxn';

    const { position, positionInsideSection } = getCommonProps(props);

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        isStatic: false
    });

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        'carrusel',
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
    );

    const error = validateCarruselChildren({ children, childProps });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    if (hideCarousel) {
        return null;
    }

    useEffect(() => {
        if (!isScriptLoaded(playerId)) {
            loadJWPlayerScript(playerId);
        }
    }, []);

    useEffect(() => {
        if (!isAdmin) {
            hideParentNode(divRefInCarrusel);
        }
    }, [divRefInCarrusel?.current]);

    const nodes = transformNodes({
        children,
        isAdmin,
        childProps,
        bannerRef: divRefInCarrusel
    });

    const nodesByExpanded = useMemo(
        () =>
            transformNodes({
                children,
                isAdmin,
                childProps,
                isExpanded: true
            }),
        []
    );

    return (
        <CajaCarruselProvider>
            <div {...extraOptsDiv}>
                <section {...viewabilityData} data-chain-id={chainId}>
                    <MediaScroller roofData={roofData}>
                        {nodes.map(child => child.node)}
                    </MediaScroller>
                    <MediaScrollerExpandedWrapper>
                        <MediaScrollerExpanded
                            listVideoData={nodesByExpanded}
                        />
                    </MediaScrollerExpandedWrapper>
                </section>
            </div>
        </CajaCarruselProvider>
    );
}

CajaCarrusel.label = 'LN10 Caja Carrusel';

CajaCarrusel.lazy = true;

CajaCarrusel.propTypes = {
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
    }).isRequired,
    chainId: PropTypes.string.isRequired,
    renderables: PropTypes.array.isRequired
};

export default Consumer(CajaCarrusel);
