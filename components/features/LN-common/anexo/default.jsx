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

export const getComponentFromConfig = (
    _type,
    _props,
    bannerMob,
    bannerDsk,
    roofData,
    classNameRoof
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
                {bannerDsk}
            </>
        ),
        VivoYoutube: ({
            customFields: { vivoYoutube = '' },
            anexoBaseClassNames
        }) => {
            const containerRef = useRef(null);

            useEffect(
                () => setupIntersectionObserver(containerRef, vivoYoutube),
                [vivoYoutube]
            );

            return (
                <>
                    <div className={classNameRoof}>
                        <BuildRoof {...roofData} />
                    </div>
                    <div ref={containerRef} className={anexoBaseClassNames} />
                    {bannerMob}
                    {bannerDsk}
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
                        src={_props.isAdmin ? url : undefined}
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
        isGame,
        heightDesktop,
        heightTablet,
        heightMobile,
        logoId,
        link,
        hideTitle,
        title,
        navigator,
        buttonText,
        linkButton,
        buttonStyle,
        mobileFullWidth
    } = customFields;

    const isPreApertura = isInSection({
        sectionName: 'Pre_Apertura',
        id,
        renderables
    });

    const classNameRoof = cx({ 'lay-container': isPreApertura });

    const roofData = useRoofData({
        logoId,
        link,
        hideTitle,
        title,
        navigator,
        buttonText,
        linkButton,
        buttonStyle
    });

    const errorMessage = getErrorMessage({ isPreApertura, customFields });

    const _type = getComponentType({ ...props, isAdmin, errorMessage });

    // Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.
    const anexoClassNames = cx(
        'com-anexo',
        isPreApertura && '--anexo-1',
        !isAdmin && _type === 'Iframe' && 'skeleton-box'
    );
    const anexoBaseClassNames = cx(
        mobileFullWidth ? 'lay-container-100vw_max767 w-100_md' : 'w-100'
    );

    const { bannerMob = undefined, bannerDsk = undefined } =
        layout === get(siteProperties, 'layoutsName.HomeLN10') &&
        getDynamicBanners({ renderables, featureId: id });

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
            classNameRoof
        );

    const anexoId = `anexo-responsive-${id}`;

    useEffect(() => {
        handleIframeProps(id, url, isGame);
    }, [id, comp]);

    const iframeURLContent = (
        <>
            <div
                id={anexoId}
                className={anexoClassNames}
                style={{ overflow: 'hidden', width: '100%' }}
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

    return _type === 'Iframe' ? iframeFinal : comp();
}

AnexoFeature.label = 'LN Anexo';

AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: adjustByURL,
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        addToken: PropTypes.boolean.tag({
            label: 'Necesita token de usuario',
            group: adjustByURL,
            description:
                'Marque si el contenido requiere un token JWT en la URL',
            defaultValue: false
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByURL,
            description: 'Marque para ocultar el anexo',
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
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        }),
        hideByVivoYoutube: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByVivoYoutube,
            description: 'Marque para ocultar el anexo',
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
        })
    }).isRequired
};

export default AnexoFeature;
