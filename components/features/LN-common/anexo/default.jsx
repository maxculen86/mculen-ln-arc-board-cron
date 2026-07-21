/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/cva';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from '../../../private/common/utils/get';
import {
    adjustByURL,
    adjustByVivoYoutube,
    adjustByHTML
} from '../../../private/common/utils/propTypesHelper';
import getDynamicBanners from '../../../private/common/banners/dynamicBanners/getDynamicBanners';
import { getErrorMessage, isInSection } from './common/_helper-WebApi';
import SetFixedHeight from '../../../private/common/SetFixedHeight';
import '../../../../resources/dist/css/ln/modules/skeleton-box.css';
import { useRoofData } from '../../../chains/utils/_helpers';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';
import { typesButtonStyle } from '../../../chains/utils/setCommonCustomFields';
import { setupIntersectionObserver } from '../../LN-10-global/common/utils/intersectionObserver';
import { handleIframeProps } from './helpers/iframeHelper';
import { isTodayEnabled } from '../../../chains/LN10_Caja_Segmentada/_helpers';

const disableAnexo = 'Marque para ocultar el anexo';

export const getComponentFromConfig = (
    _type,
    _props,
    bannerMob,
    bannerDsk,
    roofData,
    classNameRoof,
    isBillboardDsk
) => {
    const components = {
        Error: ({ id, errorMessage }) => (
            <PageBuilderMessage
                key={id}
                type="warning"
                message={errorMessage}
            />
        ),
        Html: ({ customFields: { html = '' }, anexoBaseClassNames }) => (
            <>
                {isBillboardDsk && bannerDsk}
                <div className={classNameRoof}>
                    <BuildRoof {...roofData} />
                </div>
                <div
                    className={anexoBaseClassNames}
                    dangerouslySetInnerHTML={{
                        __html: html
                    }}
                />
                {bannerMob}
                {!isBillboardDsk && bannerDsk}
            </>
        ),
        VivoYoutube: ({
            customFields: { vivoYoutube = '', videoComercial },
            anexoBaseClassNames
        }) => {
            const containerRef = useRef(null);

            useEffect(() => {
                if (videoComercial && containerRef.current) {
                    containerRef.current.innerHTML = vivoYoutube;
                } else {
                    setupIntersectionObserver(containerRef, vivoYoutube);
                }
            }, [vivoYoutube, videoComercial]);

            return (
                <>
                    {isBillboardDsk && bannerDsk}
                    <div className={classNameRoof}>
                        <BuildRoof {...roofData} />
                    </div>

                    <div
                        data-youtube-video-mode="live"
                        data-testid={
                            videoComercial
                                ? 'vivoYoutube-container-anexo-disabled'
                                : null
                        }
                        ref={containerRef}
                        className={anexoBaseClassNames}
                    />
                    {bannerMob}
                    {!isBillboardDsk && bannerDsk}
                </>
            );
        },
        Iframe: ({ id, customFields: { url = '' }, anexoBaseClassNames }) => {
            const anexoId = `anexo-${id}`;
            return (
                <>
                    <div className={classNameRoof}>
                        <BuildRoof {...roofData} />
                    </div>
                    <iframe
                        id={anexoId}
                        title={anexoId}
                        data-src={!_props.isAdmin ? url : undefined}
                        src={
                            url &&
                            (_props.isAdmin ||
                                (!get(_props, 'customFields.addIdToken') &&
                                    !get(
                                        _props,
                                        'customFields.addAccessToken'
                                    )))
                                ? url
                                : undefined
                        }
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        className={anexoBaseClassNames}
                    />
                </>
            );
        }
    };
    return (components[_type] && components[_type](_props)) || null;
};

export const getComponentType = ({
    isAdmin,
    errorMessage,
    customFields: {
        url = '',
        hideByUrl = false,
        html = '',
        heightDesktop,
        heightTablet,
        heightMobile,
        hideByHtml = false,
        vivoYoutube = '',
        hideByVivoYoutube = false
    } = {}
}) =>
    (isAdmin && errorMessage && 'Error') ||
    (!errorMessage && !hideByHtml && html && 'Html') ||
    (!errorMessage && !hideByVivoYoutube && vivoYoutube && 'VivoYoutube') ||
    (!errorMessage &&
        !hideByUrl &&
        url &&
        heightDesktop &&
        heightTablet &&
        heightMobile &&
        'Iframe');

function AnexoFeature(props) {
    const { id, customFields = {} } = props;
    const {
        renderables = [],
        isAdmin,
        layout,
        siteProperties
    } = useAppContext();

    const {
        url,
        addIdToken,
        addAccessToken,
        heightDesktop,
        heightTablet,
        heightMobile,
        logoId,
        link,
        title,
        navigator,
        buttonText,
        linkButton,
        buttonStyle,
        mobileFullWidth,
        hideTitle,
        enabledDays = [],
        shouldSchedule = false
    } = customFields;

    const isPreApertura = isInSection({
        sectionName: 'Pre_Apertura',
        id,
        renderables
    });

    const classNameRoof = cx({ 'lay-container': isPreApertura });

    const errorMessage = getErrorMessage({ isPreApertura, customFields });
    const _type = getComponentType({ ...props, isAdmin, errorMessage });

    const isHome = layout === get(siteProperties, 'layoutsName.HomeLN10');

    const schedulingEnabled = shouldSchedule && !isAdmin;
    const isTodayAllowed =
        enabledDays.length > 0 && isTodayEnabled(enabledDays);

    if (schedulingEnabled && !isTodayAllowed) {
        return null;
    }

    const isIframe = _type === 'Iframe';

    const roofData = useRoofData({
        logoId,
        link,
        hideTitle,
        title,
        navigator,
        buttonText,
        linkButton,
        buttonStyle,
        isStatic: isIframe
    });

    // Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.
    const anexoClassNames = cx(
        'com-anexo',
        isPreApertura && '--anexo-1',
        !isAdmin && isIframe && 'skeleton-box',
        mobileFullWidth ? 'overflow-hidden_md' : 'overflow-hidden'
    );
    const anexoBaseClassNames = cx(
        mobileFullWidth ? 'container-100vw_max767 w-100_md' : 'w-100'
    );

    const { bannerMob = undefined, bannerDsk = undefined } =
        isHome && getDynamicBanners({ renderables, featureId: id });

    const slotId = get(bannerDsk, 'props.bannerConfiguration.slotId', null);
    const isBillboardDsk = slotId === 'billboard_dsk';

    const comp = () =>
        getComponentFromConfig(
            _type,
            {
                ...props,
                errorMessage,
                anexoBaseClassNames,
                isAdmin
            },
            bannerMob,
            bannerDsk,
            roofData,
            classNameRoof,
            isBillboardDsk
        );

    const anexoId = `anexo-responsive-${id}`;

    useEffect(() => {
        handleIframeProps(id, url, addIdToken, addAccessToken);
    }, [id, url, addIdToken, addAccessToken, comp]);

    const iframeURLContent = (
        <>
            <div
                id={anexoId}
                className={anexoClassNames}
                style={{ width: '100%' }}
            >
                <SetFixedHeight
                    elementId={anexoId}
                    heightMobile={heightMobile}
                    heightTablet={heightTablet}
                    heightDesktop={heightDesktop}
                />
                {comp()}
            </div>
            {bannerMob}
            {bannerDsk}
        </>
    );

    const iframeFinal = (
        <Static id={anexoId} htmlOnly>
            {iframeURLContent}
        </Static>
    );

    return isIframe ? iframeFinal : comp();
}

AnexoFeature.label = 'LN Anexo';

AnexoFeature.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: adjustByURL,
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        addIdToken: PropTypes.bool.tag({
            label: 'Necesita token de usuario',
            group: adjustByURL,
            description: 'Incluir ID token del usuario en la URL',
            defaultValue: false
        }),
        addAccessToken: PropTypes.bool.tag({
            label: 'Necesita producto premium',
            group: adjustByURL,
            description: 'Incluir access token (productos premium) en la URL',
            defaultValue: false
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByURL,
            description: disableAnexo,
            defaultValue: false
        }),
        html: PropTypes.richtext.tag({
            label: 'HTML',
            group: adjustByHTML,
            description: 'Ingrese aquí el HTML del anexo',
            defaultValue: ''
        }),
        vivoYoutube: PropTypes.richtext.tag({
            label: 'VIVO YOUTUBE',
            group: adjustByVivoYoutube,
            description: 'Ingrese aquí el VIVO YOUTUBE del anexo',
            defaultValue: ''
        }),
        videoComercial: PropTypes.bool.tag({
            label: 'Video Comercial',
            description: 'Marque para desactivar carga diferida',
            group: adjustByVivoYoutube,
            defaultValue: false
        }),
        heightDesktop: PropTypes.number.tag({
            label: 'Alto Desktop',
            group: adjustByURL,
            description: 'Ingrese el alto fijo del anexo para Desktop',
            defaultValue: 0
        }),
        heightTablet: PropTypes.number.tag({
            label: 'Alto Tablet',
            group: adjustByURL,
            description: 'Ingrese el alto fijo del anexo para Tablet',
            defaultValue: 0
        }),
        heightMobile: PropTypes.number.tag({
            label: 'Alto Mobile',
            group: adjustByURL,
            description: 'Ingrese el alto fijo del anexo para Mobile',
            defaultValue: 0
        }),
        hideByHtml: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByHTML,
            description: disableAnexo,
            defaultValue: false
        }),
        hideByVivoYoutube: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByVivoYoutube,
            description: disableAnexo,
            defaultValue: false
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
        hideTitle: PropTypes.bool.tag({
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
        mobileFullWidth: PropTypes.bool.tag({
            label: 'Ancho completo en mobile',
            description:
                'Marque para que el anexo ocupe el ancho completo en mobile',
            defaultValue: false
        }),
        shouldSchedule: PropTypes.bool.tag({
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
        }),
        hideAppMobile: PropTypes.boolean.tag({
            name: 'Ocultar feature en App Mobile (Android e iOS)',
            description: 'Marque para ocultar el feature en apps móviles',
            defaultValue: false
        })
    }).isRequired
};

export default AnexoFeature;
