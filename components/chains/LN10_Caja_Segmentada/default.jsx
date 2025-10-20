import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import useAuthManager from '../../private/common/auth/hooks/useAuthManager';
import {
    hasValidationFailed,
    shouldFetchContent,
    shouldHideComponent,
    shouldShowComponent,
    shouldShowPlaceholder
} from './_helpers';
import { validateChain } from './common/_helper-WebApi';
import setRender from '../utils/setRender';
import LazyLoad from '../../common/LazyLoad/LazyLoad';
import CommonCollection from '../../private/LN10/home/components/CommonCollection/default';
import diagramationRules from '../../private/common/utils/diagramationRules';
import { useRoofData } from '../utils/_helpers';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import getComponent from '../utils/getComponent';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import useGetArticlesForSegment from '../../private/LN/common/hooks/useGetArticlesForSegment';
import { useSegmentMatch } from './common/hooks/useSegmentMatch';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import useProductClickTracker from './common/hooks/useProductClickTracker';
import { LAYOUTS } from '../utils/common/_helpers-WebApi';
import { SkeletonSegmentedBox } from './components/Skeleton';

function Noop() {
    return null;
}

function CajaSegmentada(props) {
    const { id: chainId, isAdmin, customFields, renderables = [] } = props;
    const {
        notesQuantity,
        position,
        positionInsideSection,
        termicaCajaSegmentada: termica
    } = getCommonProps(props);

    const {
        idCollection,
        segment = '',
        enabledDays = [],
        hideCaja = false,
        initialPosition,
        shouldSchedule = false,
        ...propsForRoof
    } = customFields;

    const layout = LAYOUTS.LOGO_3_GRID;

    const roofData = useRoofData({
        ...propsForRoof,
        chainStyle: undefined,
        isAdmin,
        isStatic: false
    });

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );
    const { token } = useAuthManager();

    const configError = validateChain({
        idCollection,
        segment
    });

    const validationFailed = hasValidationFailed({
        isAdmin,
        termica,
        configError,
        hideCaja,
        enabledDays,
        token,
        shouldSchedule
    });

    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

    const {
        loading: isLoadingSegmentation,
        segmentMatches,
        attemptedLoad
    } = useSegmentMatch(segment, hasEnteredViewport, validationFailed);

    const shouldFetch = shouldFetchContent({
        validationFailed,
        segmentMatches,
        isAdmin,
        hasEnteredViewport
    });

    const articles = useGetArticlesForSegment({
        shouldFetch,
        idCollection,
        initialPosition,
        notesQuantity,
        layout
    });

    const isLoadingArticles = shouldFetch && articles.length === 0;

    const hideBox = shouldHideComponent({
        isAdmin,
        attemptedLoad,
        validationFailed,
        isLoadingArticles,
        segmentMatches,
        articles
    });

    const showComponent = shouldShowComponent({
        hasEnteredViewport,
        attemptedLoad,
        isLoadingArticles,
        isLoadingSegmentation
    });

    const showPlaceholder = shouldShowPlaceholder({
        attemptedLoad,
        isLoadingArticles
    });

    useProductClickTracker(articles, chainId);

    const ContainerCards = getComponent('', layout);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection,
        true,
        false,
        viewabilityRoof
    );

    return (
        <div
            {...{
                ...extraOptsDiv,
                id: chainId
            }}
        >
            {setRender({
                chainId,
                viewabilityData: {
                    ...viewabilityData,
                    Segmento_ID: segment
                },
                isAdmin,
                error: configError,
                hideBox,
                extraOptions: {
                    default: (
                        <LazyLoad
                            hide={hideBox}
                            showComponent={showComponent}
                            PlaceholderComponent={
                                showPlaceholder ? SkeletonSegmentedBox : Noop
                            }
                            rootMargin="700px"
                            threshold={0.1}
                            onViewport={() => {
                                setHasEnteredViewport(true);
                            }}
                        >
                            <CommonCollection
                                roofData={roofData}
                                rules={diagramationRules(layout) || []}
                                gridType={layout}
                                articles={articles}
                                layout={layout}
                                ContainerCards={ContainerCards}
                                position={position}
                                isContentLab100={false}
                                isExclusiveSub
                                isFoodit={false}
                                isSegmentedBox
                            />
                        </LazyLoad>
                    )
                }
            })}
        </div>
    );
}

CajaSegmentada.label = 'LN10-Caja_segmentada';
CajaSegmentada.lazy = true;

CajaSegmentada.propTypes = {
    id: PropTypes.string.isRequired,
    renderables: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Ajuste Segmentada',
            hidden: false
        }).isRequired,
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: 'Ajuste Segmentada',
            hidden: false
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: 'Ajuste Segmentada',
            hidden: false
        }),
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
        segment: PropTypes.string.tag({
            name: 'ID de Segmento',
            description: 'Ingrese el ID del segmento para el mostrar la caja',
            defaultValue: ''
        }),
        shouldSchedule: PropTypes.boolean.tag({
            name: 'Activar Calendarización',
            description:
                'Marque para mostrar en los días configurados. Desmarque para mostrar todos los días.',
            defaultValue: false
        }),
        enabledDays: PropTypes.list.tag({
            name: 'Días habilitados',
            description:
                'Ingrese los días de la semana en los que se desea mostrar la caja (en minúsculas, sin tildes, ej: "miercoles")',
            defaultValue: []
        })
    }).isRequired
};

export default Consumer(CajaSegmentada);
