/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments          */

import React, { useEffect, useContext } from 'react';
import PropTypes from 'fusion:prop-types';

import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Image from './image';
import PullQuote from './pullQuote';
import Tags from './tags';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Subtitle from './subtitle';
import Paragraph from './parrafo';
import Banner from '../../common/bannerRefactor';
import ConfigBuilder from '../../common/bannerRefactor/builder';
import {
    getSlotForDevice,
    isPrimarySectionInBannerSegments
} from '../../common/bannerRefactor/utils';
import { slotsConfig } from '../../common/bannerRefactor/config';
import get from '../../../common/utils/get';
import RawHTML from '../../common/rawHTML';
import OembedAMP from './oembedAMP';
import BotonLink from './botonLink';
import Html from './html';
import OptaAMP from './optaAMP';
import Video from './video';
import { setStorageConfiguration } from '../../../common/utils/storage';
import { FOTOAL100 } from '../../../common/utils/subtypes/subtypeHelper';
import useViewportSize from '../../../common/hooks/useViewportSize';
import { GlobalContext } from '../../../common/context/globalContext';

const Cuerpo = props => {
    const {
        bannerConfig: banners,
        outputType,
        globalContent: {
            _id,
            headlines: { basic: tituloNota },
            content_elements: contentElements,
            subtype
        }
    } = props;

    const device = useViewportSize();

    const sponsored = get(props.globalContent, 'owner.sponsored');
    const advertiser = get(props.globalContent, 'label.marca_anunciante.text');

    const mostrarBanners = get(
        props.globalContent,
        'label.mostrar_banners.text'
    );

    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});
    const termicas = get(siteService, 'termicas', []).some(
        termica => termica.key === 'banners'
    )
        ? get(siteService, 'termicas', []).find(
              termica => termica.key === 'banners'
          ).value === 'true'
        : 'false';
    const bannersSiteConfig = get(siteService, 'banners');
    const dfpId = get(siteService, 'bannerConfig.dfp_id');
    const adserver = get(siteService, 'adserver', []);
    const segments = adserver.map(segment => segment.value);
    const primarySection = get(
        props.globalContent,
        'taxonomy.primary_section._id'
    );

    const bodyComponents = [
        Paragraph,
        PullQuote,
        BlockQuote,
        Tags,
        Subtitle,
        Gallery,
        ListOrderedOrUnordered,
        Image,
        Video,
        RawHTML,
        OembedAMP,
        BotonLink,
        Html,
        OptaAMP
    ];
    // TODO: Ver si este es el mejor lugar donde poner este script.
    // Setea valores en el Local Storage solo del lado del cliente
    useEffect(() => {
        try {
            setStorageConfiguration(_id);
        } catch (e) {
            console.error('Error en setear Local Storage');
        }
    }, [_id]);

    const types = ['text', 'image', 'oembed_response', 'video'];

    const firstText = contentElements.find(element => element.type === 'text');

    const getElementsCount = supportedTypes =>
        contentElements.filter(el => supportedTypes.includes(el.type)).length;

    const elementsCount = getElementsCount(types);

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    let counter = 0;
    const output = contentElements.map((element, currentIndex) => {
        const hasOptaElements =
            element.content && element.content.includes('opta-widget');
        const Component = bodyComponents.find(bc => {
            if (subtype === FOTOAL100) {
                return (
                    !(
                        element.type === 'oembed_response' ||
                        element.type === 'raw_html' ||
                        element.type === 'video'
                    ) && bc.arcType === element.type
                );
            }
            if (element.type === 'quote') return bc.arcType === element.subtype;
            if (
                hasOptaElements &&
                element.type === 'raw_html' &&
                outputType === 'amp'
            ) {
                return bc.arcType === element.type && bc.outputType === 'opta';
            }
            if (
                element.type === 'oembed_response' ||
                element.type === 'raw_html'
            ) {
                return (
                    bc.arcType === element.type && bc.outputType === outputType
                );
            }
            return bc.arcType === element.type;
        });

        const { arcType = '' } = Component || {};
        const extraProps =
            ['image', 'gallery'].findIndex(el => el === (arcType || '')) !== -1
                ? { withZoom: '--zoom' }
                : {};
        const extraPropsVideo =
            ['video'].findIndex(el => el === (arcType || '')) !== -1
                ? {
                      tituloNota,
                      primerParrafo: firstText
                  }
                : {};
        if (Component) {
            if (types.includes(Component.arcType)) {
                const { additional_properties: additionalProperties = {} } =
                    element || {};
                const { nodeType = {} } = additionalProperties || {};
                if (nodeType.length) return <></>;
                counter += 1;
                return (
                    <React.Fragment>
                        <Component
                            data={element}
                            capital={currentIndex === capitalIndex}
                            outputType={outputType}
                            {...extraProps}
                            {...extraPropsVideo}
                        />
                        {banners &&
                            banners.some(
                                banner => banner.position === counter
                            ) &&
                            banners
                                .filter(banner => banner.position === counter)
                                .map(value => {
                                    if (mostrarBanners !== 'Si') return <></>;

                                    const slots = [
                                        {
                                            name: 'desktop',
                                            slot: value.desktop
                                        },
                                        { name: 'mobile', slot: value.mobile },
                                        { name: 'tablet', slot: value.tablet }
                                    ];
                                    const slotId = getSlotForDevice(device)(
                                        slots
                                    );

                                    if (!slotId) return <></>;

                                    const config = slotsConfig.nota[slotId];
                                    if (!config) return <></>;

                                    // TODO: Mover esta lógica a un utilitario ?)
                                    const configBuilder = new ConfigBuilder();
                                    configBuilder.init({
                                        ...config,
                                        slotId,
                                        dfpId,
                                        slotGroup: 'nota',
                                        show: {
                                            termicas,
                                            collection: true
                                        }
                                    });

                                    const [
                                        present,
                                        section
                                    ] = isPrimarySectionInBannerSegments(
                                        primarySection
                                    )(segments);
                                    if (present) {
                                        configBuilder.segmentAdUnit(
                                            section,
                                            device
                                        );
                                    }

                                    if (sponsored && advertiser)
                                        configBuilder.setCustomAdUnit(
                                            'ContentLab'
                                        );

                                    if (bannersSiteConfig)
                                        configBuilder.setDimensionsFromSiteService(
                                            bannersSiteConfig,
                                            'Nota',
                                            slotId
                                        );

                                    return (
                                        elementsCount > counter && (
                                            <Banner
                                                config={configBuilder.get()}
                                            />
                                        )
                                    );
                                })}
                    </React.Fragment>
                );
            }
            return (
                <Component
                    data={element}
                    capital={currentIndex === capitalIndex}
                    outputType={outputType}
                    {...extraProps}
                />
            );
        }

        return <></>;
    });
    return output;
};

Cuerpo.propTypes = {
    isAdmin: PropTypes.bool,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
